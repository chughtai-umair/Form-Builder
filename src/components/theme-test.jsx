import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ThemeTest() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-8 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Theme Test</CardTitle>
          <CardDescription>
            Current theme: <strong>{theme}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={toggleTheme}>
            Switch to {theme === "light" ? "dark" : "light"} mode
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Light Theme Test</CardTitle>
            <CardDescription>
              This card should change appearance based on theme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This text uses muted foreground color and should be readable in
              both themes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dark Theme Test</CardTitle>
            <CardDescription>
              Background and text should adapt automatically
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-x-2">
              <Button variant="default">Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
