import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
export function Check() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

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
    "1757938944929",
    "1757938945761",
    "1757938945409",
    "1757938966497",
    "1757939072521",
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
                <Label htmlFor="1757938944929">Text Input</Label>
                <Input
                  id="1757938944929"
                  name="1757938944929"
                  type="text"
                  placeholder="Enter text input"
                />
              </div>
            </div>
            <div className="w-1/3">
              <div className="space-y-2">
                <Label htmlFor="1757938945761">Phone</Label>
                <Input
                  id="1757938945761"
                  name="1757938945761"
                  type="phone"
                  placeholder="Enter phone"
                />
              </div>
            </div>
            <div className="w-1/3">
              <div className="space-y-2">
                <Label htmlFor="1757938945409">Password</Label>
                <Input
                  id="1757938945409"
                  name="1757938945409"
                  type="password"
                  placeholder="Enter password"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <div className="w-1/2">
              <div className="space-y-2">
                <Label htmlFor="1757938966497">Number</Label>
                <Input
                  id="1757938966497"
                  name="1757938966497"
                  type="number"
                  placeholder="Enter number"
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="space-y-2">
                <Label htmlFor="1757939072521">Text Input</Label>
                <Input
                  id="1757939072521"
                  name="1757939072521"
                  type="text"
                  placeholder="Enter text input"
                />
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
