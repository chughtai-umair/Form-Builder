import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  rectIntersection,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Type,
  Mail,
  Lock,
  Calendar as CalendarIconComponent,
  CheckSquare,
  List,
  FileText,
  Phone,
  MapPin,
  Hash,
  Settings,
  Edit,
  Code,
  FileJson,
  Upload,
  ToggleLeft,
  Circle,
  Star,
  Clock,
  Globe,
  DollarSign,
  Percent,
  GripVertical,
} from "lucide-react";

// Form Builder Components List - Enhanced with all Shadcn UI components
const formComponents = [
  { id: "text", name: "Text Input", icon: Type, type: "input" },
  { id: "email", name: "Email", icon: Mail, type: "input" },
  { id: "password", name: "Password", icon: Lock, type: "input" },
  { id: "number", name: "Number", icon: Hash, type: "input" },
  { id: "phone", name: "Phone", icon: Phone, type: "input" },
  { id: "url", name: "URL", icon: Globe, type: "input" },
  { id: "textarea", name: "Textarea", icon: FileText, type: "textarea" },
  { id: "select", name: "Select", icon: List, type: "select" },
  { id: "checkbox", name: "Checkbox", icon: CheckSquare, type: "checkbox" },
  { id: "radio", name: "Radio Group", icon: Circle, type: "radio" },
  { id: "switch", name: "Switch", icon: ToggleLeft, type: "switch" },
  { id: "date", name: "Date", icon: CalendarIconComponent, type: "date" },
  { id: "time", name: "Time", icon: Clock, type: "input" },
  { id: "file", name: "File Upload", icon: Upload, type: "file" },
  { id: "address", name: "Address", icon: MapPin, type: "input" },
  { id: "rating", name: "Rating", icon: Star, type: "rating" },
  { id: "currency", name: "Currency", icon: DollarSign, type: "input" },
  { id: "percentage", name: "Percentage", icon: Percent, type: "input" },
];

// Sortable Field Item Component for Drag and Drop with Grid Support
function SortableFieldItem({
  field,
  isSelected,
  onSelect,
  onRemove,
  children,
  isInRow = false,
  rowPosition = 0,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Calculate width based on position in row (1 field = full width, 2 fields = half width, 3 fields = third width)
  const getFieldWidth = () => {
    if (!isInRow) return "w-full";
    if (rowPosition === 1) return "w-full";
    if (rowPosition === 2) return "w-1/2";
    return "w-1/3";
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group border rounded-lg p-3 cursor-pointer transition-colors",
        getFieldWidth(),
        isSelected
          ? "border-primary bg-primary/5"
          : "border-gray-200 hover:border-gray-300",
        isDragging && "opacity-50 scale-105"
      )}
      onClick={() => onSelect(field)}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Field Content */}
      <div className="pr-8">
        <div className="flex justify-between items-start mb-2">
          <Label className="font-medium text-sm">{field.label}</Label>
          <div className="flex items-center space-x-2">
            {field.required && (
              <Badge variant="secondary" className="text-xs">
                Required
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(field.id);
              }}
              className="h-6 w-6 p-0 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </Button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Playground() {
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [activeTab, setActiveTab] = useState("edit");
  const [dateValues, setDateValues] = useState({});
  const [activeId, setActiveId] = useState(null);

  // Helper function to organize fields into rows (max 3 per row, min 1 per row)
  const organizeFieldsIntoRows = (fields) => {
    const rows = [];
    const fieldsPerRow = 2;

    for (let i = 0; i < fields.length; i += fieldsPerRow) {
      const row = fields.slice(i, i + fieldsPerRow);
      rows.push(row);
    }

    return rows;
  };
  // Drag and Drop sensors with restricted area
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag start - set active item
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };
  // Handle drag end - reorder fields with boundary restrictions
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    // Check if over is not null and has a valid id
    if (active && over && active.id !== over.id) {
      setSelectedFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        // Only proceed if both indices are valid
        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(items, oldIndex, newIndex);
        }
        return items; // Return unchanged if indices are invalid
      });
    }
  };

  // Handle drag cancel
  const handleDragCancel = () => {
    setActiveId(null);
  };

  // Add field to center area
  const addField = (component) => {
    const newField = {
      id: Date.now(),
      type: component.type,
      componentId: component.id,
      name: component.name,
      label: component.name,
      placeholder: `Enter ${component.name.toLowerCase()}`,
      required: false,
      options:
        component.id === "select"
          ? ["Option 1", "Option 2"]
          : component.id === "radio"
          ? ["Option 1", "Option 2"]
          : [],
      min: component.id === "rating" ? 1 : undefined,
      max: component.id === "rating" ? 5 : undefined,
      step:
        component.id === "percentage"
          ? 0.1
          : component.id === "currency"
          ? 0.01
          : undefined,
    };
    setSelectedFields([...selectedFields, newField]);
  };

  // Select field for editing
  const selectField = (field) => {
    setSelectedField(field);
  };

  // Update field settings
  const updateFieldSetting = (key, value) => {
    if (selectedField) {
      const updatedFields = selectedFields.map((field) =>
        field.id === selectedField.id ? { ...field, [key]: value } : field
      );
      setSelectedFields(updatedFields);
      setSelectedField({ ...selectedField, [key]: value });
    }
  };
  // Remove field
  const removeField = (fieldId) => {
    setSelectedFields(selectedFields.filter((field) => field.id !== fieldId));
    if (selectedField && selectedField.id === fieldId) {
      setSelectedField(null);
    }
  };
  // Generate JSON for selected field
  const generateFieldJSON = (field) => {
    return JSON.stringify(
      {
        id: field.id,
        type: field.type,
        componentId: field.componentId,
        name: field.name,
        label: field.label,
        placeholder: field.placeholder,
        required: field.required,
        options: field.options || [],
        min: field.min,
        max: field.max,
        step: field.step,
      },
      null,
      2
    );
  };

  // Generate complete form code - Smart imports based on used components
  const generateFormCode = () => {
    if (selectedFields.length === 0) {
      return `// No fields selected. Please add some form fields to generate code.

export function GeneratedForm() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Generated Form</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Add some form fields to see the generated code.</p>
      </CardContent>
    </Card>
  );
}`;
    }

    // Determine which components are actually used
    const usedTypes = new Set(selectedFields.map((field) => field.type));
    const hasDateField = selectedFields.some((field) => field.type === "date");
    const hasSelectField = selectedFields.some(
      (field) => field.type === "select"
    );
    const hasTextareaField = selectedFields.some(
      (field) => field.type === "textarea"
    );
    const hasCheckboxField = selectedFields.some(
      (field) => field.type === "checkbox"
    );
    const hasRadioField = selectedFields.some(
      (field) => field.type === "radio"
    );
    const hasSwitchField = selectedFields.some(
      (field) => field.type === "switch"
    );
    const hasFileField = selectedFields.some((field) => field.type === "file");
    const hasRatingField = selectedFields.some(
      (field) => field.type === "rating"
    );

    // Build imports array based on what's actually used
    const imports = [];

    // Always needed imports
    imports.push('import { Button } from "@/components/ui/button";');
    imports.push('import { Label } from "@/components/ui/label";');
    imports.push(
      'import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";'
    );

    // Conditional imports - Smart import system
    if (usedTypes.has("input") || hasFileField || hasRatingField) {
      imports.push('import { Input } from "@/components/ui/input";');
    }

    if (hasTextareaField) {
      imports.push('import { Textarea } from "@/components/ui/textarea";');
    }

    if (hasCheckboxField) {
      imports.push('import { Checkbox } from "@/components/ui/checkbox";');
    }

    if (hasRadioField) {
      imports.push(
        'import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";'
      );
    }

    if (hasSwitchField) {
      imports.push('import { Switch } from "@/components/ui/switch";');
    }

    if (hasSelectField) {
      imports.push(
        'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";'
      );
    }

    if (hasDateField) {
      imports.push('import { Calendar } from "@/components/ui/calendar";');
      imports.push(
        'import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";'
      );
      imports.push('import { CalendarIcon } from "lucide-react";');
      imports.push('import { format } from "date-fns";');
      imports.push('import { cn } from "@/lib/utils";');
    }

    if (hasRatingField) {
      imports.push('import { Star } from "lucide-react";');
    }

    imports.push('import { useState } from "react";');
    const importSection = imports.join("\n");

    // Helper function for code generation
    const organizeFieldsIntoRowsForCode = (fields) => {
      const rows = [];
      const fieldsPerRow = 3;

      for (let i = 0; i < fields.length; i += fieldsPerRow) {
        rows.push(fields.slice(i, i + fieldsPerRow));
      }

      return rows;
    };

    // Component start with smart state management
    let componentStart = `
export function GeneratedForm() {`;

    // State management - only add if needed
    if (hasDateField) {
      componentStart += `
  const [dateValues, setDateValues] = useState({});`;
    }

    componentStart += `
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);`;

    if (hasDateField) {
      componentStart += `
    
    // Add date values to form data
    Object.keys(dateValues).forEach(key => {
      if (dateValues[key]) {
        data[key] = format(dateValues[key], "yyyy-MM-dd");
      }
    });`;
    }
    componentStart += `
    
    console.log('Form Data:', data);
  };

  // Helper function to organize fields into rows (max 3 per row)
  const organizeFieldsIntoRows = (fields) => {
    const rows = [];
    const fieldsPerRow = 3;
    
    for (let i = 0; i < fields.length; i += fieldsPerRow) {
      rows.push(fields.slice(i, i + fieldsPerRow));
    }
    
    return rows;
  };

  const fieldRows = organizeFieldsIntoRows([${selectedFields
    .map((field) => `"${field.id}"`)
    .join(", ")}]);

  return (
    <Card className="w-full max-w-4xl mx-auto py-7 px-2">
      <CardHeader>
        <CardTitle>Generated Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">`; // Generate fields with proper Shadcn components in grid layout
    const generateFieldWithWidth = (field, fieldsInRow) => {
      const widthClass =
        fieldsInRow === 1 ? "w-full" : fieldsInRow === 2 ? "w-1/2" : "w-1/3";

      const fieldContent = (() => {
        switch (field.type) {
          case "input":
            const inputType =
              field.componentId === "currency"
                ? "number"
                : field.componentId === "percentage"
                ? "number"
                : field.componentId === "phone"
                ? "number"
                : field.componentId;
            const stepAttr =
              field.componentId === "currency"
                ? ' step="0.01"'
                : field.componentId === "percentage"
                ? ' step="0.1" max="100"'
                : "";

            return `<div className="space-y-2">
            <Label htmlFor="${field.id}">${field.label}${
              field.required ? " *" : ""
            }</Label>
            <Input
              id="${field.id}"
              name="${field.id}"
              type="${inputType}"
              placeholder="${field.placeholder}"${stepAttr}${
              field.required ? "\n              required" : ""
            }
            />
          </div>`;

          case "textarea":
            return `<div className="space-y-2">
            <Label htmlFor="${field.id}">${field.label}${
              field.required ? " *" : ""
            }</Label>
            <Textarea
              id="${field.id}"
              name="${field.id}"
              placeholder="${field.placeholder}"
              rows={3}${field.required ? "\n              required" : ""}
            />
          </div>`;

          case "select":
            const selectOptions =
              field.options
                ?.map(
                  (option) =>
                    `<SelectItem value="${option}">${option}</SelectItem>`
                )
                .join("\n                ") || "";

            return `<div className="space-y-2">
            <Label htmlFor="${field.id}">${field.label}${
              field.required ? " *" : ""
            }</Label>
            <Select name="${field.id}"${field.required ? " required" : ""}>
              <SelectTrigger>
                <SelectValue placeholder="${
                  field.placeholder || "Select an option"
                }" />
              </SelectTrigger>
              <SelectContent>
                ${selectOptions}
              </SelectContent>
            </Select>
          </div>`;

          case "checkbox":
            return `<div className="flex items-center space-x-2">
            <Checkbox
              id="${field.id}"
              name="${field.id}"${
              field.required ? "\n              required" : ""
            }
            />
            <Label htmlFor="${field.id}">${field.label}${
              field.required ? " *" : ""
            }</Label>
          </div>`;

          case "radio":
            const radioOptions =
              field.options
                ?.map(
                  (option, index) =>
                    `<div className="flex items-center space-x-2">
                <RadioGroupItem value="${option}" id="${field.id}_${index}" />
                <Label htmlFor="${field.id}_${index}">${option}</Label>
              </div>`
                )
                .join("\n              ") || "";

            return `<div className="space-y-2">
            <Label>${field.label}${field.required ? " *" : ""}</Label>
            <RadioGroup name="${field.id}"${field.required ? " required" : ""}>
              ${radioOptions}
            </RadioGroup>
          </div>`;

          case "switch":
            return `<div className="flex items-center space-x-2">
            <Switch
              id="${field.id}"
              name="${field.id}"
            />
            <Label htmlFor="${field.id}">${field.label}${
              field.required ? " *" : ""
            }</Label>
          </div>`;

          case "date":
            return `<div className="space-y-2">
            <Label>${field.label}${field.required ? " *" : ""}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !dateValues["${field.id}"] && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateValues["${field.id}"] ? format(dateValues["${
              field.id
            }"], "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateValues["${field.id}"]}
                  onSelect={(date) => setDateValues(prev => ({ ...prev, "${
                    field.id
                  }": date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>`;

          case "file":
            return `<div className="space-y-2">
            <Label htmlFor="${field.id}">${field.label}${
              field.required ? " *" : ""
            }</Label>
            <Input
              id="${field.id}"
              name="${field.id}"
              type="file"${field.required ? "\n              required" : ""}
            />
          </div>`;

          case "rating":
            return `<div className="space-y-2">
            <Label>${field.label}${field.required ? " *" : ""}</Label>
            <div className="flex space-x-1">
              {Array.from({ length: ${field.max || 5} }, (_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 cursor-pointer" />
              ))}
            </div>
          </div>`;

          default:
            return `<div className="space-y-2">
            <Label htmlFor="${field.id}">${field.label}</Label>
            <Input
              id="${field.id}"
              name="${field.id}"
              placeholder="${field.placeholder}"
            />
          </div>`;
        }
      })();

      return `            <div className="${widthClass}">
              ${fieldContent}
            </div>`;
    }; // Organize fields into rows and generate the layout
    const rows = organizeFieldsIntoRowsForCode(selectedFields);
    const fields = rows
      .map((row) => {
        const rowFields = row
          .map((field) => generateFieldWithWidth(field, row.length))
          .join("\n");
        return `          <div className="flex gap-4 w-full">
${rowFields}
          </div>`;
      })
      .join("\n\n");

    const componentEnd = `
          
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}`;

    return importSection + componentStart + "\n\n" + fields + componentEnd;
  };
  // Add option to select/radio field
  const addOption = () => {
    if (
      selectedField &&
      (selectedField.type === "select" || selectedField.type === "radio")
    ) {
      const currentLength = selectedField.options?.length || 0;
      const newOptions = [
        ...(selectedField.options || []),
        `Option ${currentLength + 1}`,
      ];
      updateFieldSetting("options", newOptions);
    }
  };

  // Remove option from select/radio field
  const removeOption = (index) => {
    if (
      selectedField &&
      (selectedField.type === "select" || selectedField.type === "radio")
    ) {
      const newOptions =
        selectedField.options?.filter((_, i) => i !== index) || [];
      updateFieldSetting("options", newOptions);
    }
  };

  // Update option value
  const updateOption = (index, value) => {
    if (
      selectedField &&
      (selectedField.type === "select" || selectedField.type === "radio")
    ) {
      const newOptions = [...(selectedField.options || [])];
      newOptions[index] = value;
      updateFieldSetting("options", newOptions);
    }
  };

  // Render form field with proper Shadcn UI components
  const renderFormField = (field) => {
    switch (field.type) {
      case "input":
        const inputType =
          field.componentId === "currency"
            ? "number"
            : field.componentId === "percentage"
            ? "number"
            : field.componentId;
        const stepAttr =
          field.componentId === "currency"
            ? { step: "0.01" }
            : field.componentId === "percentage"
            ? { step: "0.1", max: "100" }
            : {};

        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && " *"}
            </Label>
            <Input
              id={field.id}
              type={inputType}
              placeholder={field.placeholder}
              {...stepAttr}
              required={field.required}
            />
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && " *"}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              rows={3}
              required={field.required}
            />
          </div>
        );

      case "select":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && " *"}
            </Label>
            <Select required={field.required}>
              <SelectTrigger>
                <SelectValue
                  placeholder={field.placeholder || "Select an option"}
                />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={field.id} required={field.required} />
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && " *"}
            </Label>
          </div>
        );

      case "radio":
        return (
          <div className="space-y-2">
            <Label>
              {field.label}
              {field.required && " *"}
            </Label>
            <RadioGroup required={field.required}>
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${field.id}_${index}`} />
                  <Label htmlFor={`${field.id}_${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case "switch":
        return (
          <div className="flex items-center space-x-2">
            <Switch id={field.id} />
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && " *"}
            </Label>
          </div>
        );

      case "date":
        return (
          <div className="space-y-2">
            <Label>
              {field.label}
              {field.required && " *"}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !dateValues[field.id] && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateValues[field.id]
                    ? format(dateValues[field.id], "PPP")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateValues[field.id]}
                  onSelect={(date) =>
                    setDateValues((prev) => ({ ...prev, [field.id]: date }))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        );

      case "file":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && " *"}
            </Label>
            <Input id={field.id} type="file" required={field.required} />
          </div>
        );

      case "rating":
        return (
          <div className="space-y-2">
            <Label>
              {field.label}
              {field.required && " *"}
            </Label>
            <div className="flex space-x-1">
              {Array.from({ length: field.max || 5 }, (_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 text-yellow-400 cursor-pointer"
                />
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input id={field.id} placeholder={field.placeholder} />
          </div>
        );
    }
  };

  return (
    <>
      {/* <div className="p-10 px-28 border-b flex justify-center ">
        <div className="">
          <h1 className="text-4xl font-bold mb-3 ">Playground</h1>
          <p className="text-muted-foreground">
            Build and test your forms in our interactive playground. Design,
            customize, and preview your forms in real-time, and export the JSON
            code for seamless integration.
          </p>
        </div>
      </div> */}
      <div className="h-screen flex bg-background">
        {/* Left Sidebar - 20% */}
        <div className="w-1/6 border-r bg-card p-4 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold my-5 ">Form Components</h2>
              <div className="space-y-2">
                {formComponents.map((component) => {
                  const IconComponent = component.icon;
                  return (
                    <Card
                      key={component.id}
                      className="cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => addField(component)}
                    >
                      <CardContent className="px-3 py-2">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {component.name}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Center Area - 40% */}
        <div className="w-3/6 p-6 py-14 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Form Builder</h2>
              <p className="text-muted-foreground">
                Click components from the left panel to build your form
              </p>
            </div>

            <Card className="py-6">
              <CardHeader>
                <CardTitle>Form Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedFields.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Type className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No fields added yet</p>{" "}
                    <p className="text-sm">
                      Click on components from the left to add them
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <DndContext
                      sensors={sensors}
                      collisionDetection={rectIntersection}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onDragCancel={handleDragCancel}
                    >
                      <SortableContext
                        items={selectedFields.map((field) => field.id)}
                        strategy={rectSortingStrategy}
                      >
                        <div className="space-y-3 p-4 border-2 border-dashed border-gray-200 rounded-lg min-h-[300px]">
                          {organizeFieldsIntoRows(selectedFields).map(
                            (row, rowIndex) => (
                              <div
                                key={rowIndex}
                                className="flex gap-3 w-full min-h-[80px]"
                              >
                                {row.map((field) => (
                                  <SortableFieldItem
                                    key={field.id}
                                    field={field}
                                    isSelected={selectedField?.id === field.id}
                                    onSelect={selectField}
                                    onRemove={removeField}
                                    isInRow={true}
                                    rowPosition={row.length}
                                  >
                                    {renderFormField(field)}
                                  </SortableFieldItem>
                                ))}
                                {/* Empty space for dropping fields in this row */}
                                {row.length < 2 && (
                                  <div
                                    className={`border-2 border-dashed border-gray-300 rounded-lg p-3 ${
                                      row.length === 1 ? "w-1/2" : "w-1/3"
                                    } flex items-center justify-center text-gray-400 text-sm min-h-[70px]`}
                                  >
                                    Drop field here
                                  </div>
                                )}
                              </div>
                            )
                          )}
                          {/* Drop zone for new row */}
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-400 text-sm min-h-[80px] flex items-center justify-center">
                            Drop fields here to create a new row
                          </div>
                        </div>
                      </SortableContext>
                    </DndContext>
                  </div>
                )}

                {selectedFields.length > 0 && (
                  <div>
                    <Button className="w-1/8">Submit</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>{" "}
        {/* Right Sidebar - 40% */}
        <div className="w-2/6 border-l bg-card p-4 overflow-y-auto">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Field Settings</h2>

            {selectedField ? (
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="edit"
                    className="flex items-center gap-1 text-xs"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </TabsTrigger>
                  <TabsTrigger
                    value="json"
                    className="flex items-center gap-1 text-xs"
                  >
                    <FileJson className="h-3 w-3" />
                    JSON
                  </TabsTrigger>
                  <TabsTrigger
                    value="code"
                    className="flex items-center gap-1 text-xs"
                  >
                    <Code className="h-3 w-3" />
                    Code
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="edit" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="label">Field Label</Label>
                    <Input
                      id="label"
                      value={selectedField.label}
                      onChange={(e) =>
                        updateFieldSetting("label", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="placeholder">Placeholder</Label>
                    <Input
                      id="placeholder"
                      value={selectedField.placeholder}
                      onChange={(e) =>
                        updateFieldSetting("placeholder", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>{" "}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="required"
                      checked={selectedField.required}
                      onCheckedChange={(checked) =>
                        updateFieldSetting("required", checked)
                      }
                    />
                    <Label htmlFor="required">Required Field</Label>
                  </div>
                  {/* Options for select and radio fields */}
                  {(selectedField.type === "select" ||
                    selectedField.type === "radio") && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Options</Label>
                        <Button size="sm" onClick={addOption}>
                          Add Option
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {selectedField.options?.map((option, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={option}
                              onChange={(e) =>
                                updateOption(index, e.target.value)
                              }
                              placeholder={`Option ${index + 1}`}
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeOption(index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Rating field settings */}
                  {selectedField.type === "rating" && (
                    <>
                      <div>
                        <Label htmlFor="min">Min Rating</Label>
                        <Input
                          id="min"
                          type="number"
                          value={selectedField.min || 1}
                          onChange={(e) =>
                            updateFieldSetting(
                              "min",
                              parseInt(e.target.value) || 1
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="max">Max Rating</Label>
                        <Input
                          id="max"
                          type="number"
                          value={selectedField.max || 5}
                          onChange={(e) =>
                            updateFieldSetting(
                              "max",
                              parseInt(e.target.value) || 5
                            )
                          }
                        />
                      </div>
                    </>
                  )}
                  {/* Step for currency and percentage fields */}
                  {(selectedField.componentId === "currency" ||
                    selectedField.componentId === "percentage") && (
                    <div>
                      <Label htmlFor="step">Step</Label>
                      <Input
                        id="step"
                        type="number"
                        step="0.01"
                        value={
                          selectedField.step ||
                          (selectedField.componentId === "currency"
                            ? 0.01
                            : 0.1)
                        }
                        onChange={(e) =>
                          updateFieldSetting(
                            "step",
                            parseFloat(e.target.value) || 0.01
                          )
                        }
                      />
                    </div>
                  )}
                  <div className="border-t pt-4">
                    <Label className="text-sm text-muted-foreground">
                      Field Type
                    </Label>
                    <p className="text-sm font-medium">{selectedField.name}</p>
                  </div>
                </TabsContent>

                <TabsContent value="json" className="space-y-4 mt-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">Field JSON</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            generateFieldJSON(selectedField)
                          );
                        }}
                        className="text-xs"
                      >
                        Copy
                      </Button>
                    </div>
                    <div className="relative">
                      <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-96 whitespace-pre-wrap">
                        {generateFieldJSON(selectedField)}
                      </pre>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="code" className="space-y-4 mt-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">
                        Complete Form Code
                      </Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(generateFormCode());
                        }}
                        className="text-xs"
                      >
                        Copy
                      </Button>
                    </div>
                    <div className="relative">
                      <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-96 whitespace-pre-wrap">
                        {generateFormCode()}
                      </pre>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <div className="mb-4">
                  <div className="h-12 w-12 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center">
                    <Settings className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-sm">
                  Select a field from the center panel to edit its settings
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
