import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
export function Check() {
  const [dateValues, setDateValues] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Add date values to form data
    Object.keys(dateValues).forEach((key) => {
      if (dateValues[key]) {
        data[key] = format(dateValues[key], "yyyy-MM-dd");
      }
    });

    console.log("Form Data:", data);
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

  const fieldRows = organizeFieldsIntoRows([
    "1757941709051",
    "1757941711275",
    "1757941712715",
    "1757941713235",
    "1757941722427",
    "1757941718514",
    "1757941721723",
    "1757941721019",
    "1757941719675",
    "1757941717994",
  ]);

  return (
    <Card className="w-full max-w-4xl mx-auto py-7 px-2">
      <CardHeader>
        <CardTitle>Generated Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 w-full">
            <div className="w-1/3">
              <div className="space-y-2">
                <Label htmlFor="1757941709051">Text Input</Label>
                <Input
                  id="1757941709051"
                  name="1757941709051"
                  type="text"
                  placeholder="Enter text input"
                />
              </div>
            </div>
            <div className="w-1/3">
              <div className="space-y-2">
                <Label htmlFor="1757941711275">Password</Label>
                <Input
                  id="1757941711275"
                  name="1757941711275"
                  type="password"
                  placeholder="Enter password"
                />
              </div>
            </div>
            <div className="w-1/3">
              <div className="space-y-2">
                <Label htmlFor="1757941712715">Number</Label>
                <Input
                  id="1757941712715"
                  name="1757941712715"
                  type="number"
                  placeholder="Enter number"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <div className="w-1/3">
              <div className="space-y-2">
                <Label htmlFor="1757941713235">Phone</Label>
                <Input
                  id="1757941713235"
                  name="1757941713235"
                  type="number"
                  placeholder="Enter phone"
                />
              </div>
            </div>
            <div className="w-1/3">
              <div className="space-y-2">
                <Label htmlFor="1757941722427">File Upload</Label>
                <Input id="1757941722427" name="1757941722427" type="file" />
              </div>
            </div>
            <div className="w-1/3">
              <div className="space-y-2">
                <Label>Radio Group</Label>
                <RadioGroup name="1757941718514">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Option 1" id="1757941718514_0" />
                    <Label htmlFor="1757941718514_0">Option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Option 2" id="1757941718514_1" />
                    <Label htmlFor="1757941718514_1">Option 2</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <div className="w-1/3">
              <div className="space-y-2">
                <Label htmlFor="1757941721723">Time</Label>
                <Input
                  id="1757941721723"
                  name="1757941721723"
                  type="time"
                  placeholder="Enter time"
                />
              </div>
            </div>
            <div className="w-1/3">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !dateValues["1757941721019"] && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateValues["1757941721019"]
                        ? format(dateValues["1757941721019"], "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateValues["1757941721019"]}
                      onSelect={(date) =>
                        setDateValues((prev) => ({
                          ...prev,
                          1757941721019: date,
                        }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
