import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Type,
  Mail,
  Lock,
  Calendar,
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
} from "lucide-react";

// Form Builder Components List
const formComponents = [
  { id: "text", name: "Text Input", icon: Type, type: "input" },
  { id: "email", name: "Email", icon: Mail, type: "input" },
  { id: "password", name: "Password", icon: Lock, type: "input" },
  { id: "number", name: "Number", icon: Hash, type: "input" },
  { id: "phone", name: "Phone", icon: Phone, type: "input" },
  { id: "textarea", name: "Textarea", icon: FileText, type: "textarea" },
  { id: "select", name: "Select", icon: List, type: "select" },
  { id: "checkbox", name: "Checkbox", icon: CheckSquare, type: "checkbox" },
  { id: "date", name: "Date", icon: Calendar, type: "date" },
  { id: "address", name: "Address", icon: MapPin, type: "input" },
];

export function Playground() {
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [activeTab, setActiveTab] = useState("edit");

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
      options: component.id === "select" ? ["Option 1", "Option 2"] : [],
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
      },
      null,
      2
    );
  };

  // Generate complete form code
  const generateFormCode = () => {
    const imports = `import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GeneratedForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log('Form Data:', data);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Generated Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">`;

    const fields = selectedFields
      .map((field) => {
        switch (field.type) {
          case "input":
            return `          <div className="space-y-2">
            <Label htmlFor="${field.id}">${field.label}${
              field.required ? " *" : ""
            }</Label>
            <Input
              id="${field.id}"
              name="${field.id}"
              type="${field.componentId}"
              placeholder="${field.placeholder}"
              ${field.required ? "required" : ""}
            />
          </div>`;
          case "textarea":
            return `          <div className="space-y-2">
            <Label htmlFor="${field.id}">${field.label}${
              field.required ? " *" : ""
            }</Label>
            <textarea
              id="${field.id}"
              name="${field.id}"
              placeholder="${field.placeholder}"
              className="w-full p-2 border rounded"
              rows={3}
              ${field.required ? "required" : ""}
            />
          </div>`;
          case "select":
            return `          <div className="space-y-2">
            <Label htmlFor="${field.id}">${field.label}${
              field.required ? " *" : ""
            }</Label>
            <select
              id="${field.id}"
              name="${field.id}"
              className="w-full p-2 border rounded"
              ${field.required ? "required" : ""}
            >
              <option value="">Select an option</option>
              ${field.options
                ?.map(
                  (option) => `<option value="${option}">${option}</option>`
                )
                .join("\n              ")}
            </select>
          </div>`;
          case "checkbox":
            return `          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="${field.id}"
              name="${field.id}"
              ${field.required ? "required" : ""}
            />
            <Label htmlFor="${field.id}">${field.label}${
              field.required ? " *" : ""
            }</Label>
          </div>`;
          default:
            return `          <div className="space-y-2">
            <Label htmlFor="${field.id}">${field.label}${
              field.required ? " *" : ""
            }</Label>
            <Input
              id="${field.id}"
              name="${field.id}"
              placeholder="${field.placeholder}"
              ${field.required ? "required" : ""}
            />
          </div>`;
        }
      })
      .join("\n\n");

    const closing = `
          <Button type="submit" className="w-full">
            Submit Form
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}`;

    return imports + "\n\n" + fields + closing;
  };

  // Render form field
  const renderFormField = (field) => {
    const commonProps = {
      placeholder: field.placeholder,
      required: field.required,
      className: "w-full",
    };

    switch (field.type) {
      case "input":
        return <Input type={field.componentId} {...commonProps} />;
      case "textarea":
        return (
          <textarea
            className="w-full p-2 border rounded"
            {...commonProps}
            rows={3}
          />
        );
      case "select":
        return (
          <select className="w-full p-2 border rounded" {...commonProps}>
            <option value="">Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <input type="checkbox" id={field.id} />
            <Label htmlFor={field.id}>{field.label}</Label>
          </div>
        );
      case "date":
        return <Input type="date" {...commonProps} />;
      default:
        return <Input {...commonProps} />;
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
                      <CardContent className="p-3">
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
                    <p>No fields added yet</p>
                    <p className="text-sm">
                      Click on components from the left to add them
                    </p>
                  </div>
                ) : (
                  selectedFields.map((field) => (
                    <div
                      key={field.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedField?.id === field.id
                          ? "border-primary bg-primary/5"
                          : "hover:bg-accent"
                      }`}
                      onClick={() => selectField(field)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Label className="font-medium">{field.label}</Label>
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
                              removeField(field.id);
                            }}
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                      {renderFormField(field)}
                    </div>
                  ))
                )}

                {selectedFields.length > 0 && (
                  <div className="pt-4">
                    <Button className="w-full">Submit Form</Button>
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
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="required"
                      checked={selectedField.required}
                      onChange={(e) =>
                        updateFieldSetting("required", e.target.checked)
                      }
                    />
                    <Label htmlFor="required">Required Field</Label>
                  </div>

                  {selectedField.componentId === "select" && (
                    <div>
                      <Label>Options</Label>
                      <div className="space-y-2 mt-2">
                        {selectedField.options?.map((option, index) => (
                          <div key={index} className="flex space-x-2">
                            <Input
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...selectedField.options];
                                newOptions[index] = e.target.value;
                                updateFieldSetting("options", newOptions);
                              }}
                              className="flex-1"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newOptions = selectedField.options.filter(
                                  (_, i) => i !== index
                                );
                                updateFieldSetting("options", newOptions);
                              }}
                              className="px-2"
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newOptions = [
                              ...(selectedField.options || []),
                              `Option ${
                                (selectedField.options?.length || 0) + 1
                              }`,
                            ];
                            updateFieldSetting("options", newOptions);
                          }}
                          className="w-full"
                        >
                          Add Option
                        </Button>
                      </div>
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
