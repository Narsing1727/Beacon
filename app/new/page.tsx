"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle2, CloudUpload, FileWarning } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ingest = [
  { name: "basin_dem.tif", status: "ok", note: "Recognized DEM → converted to Cloud-Optimized GeoTIFF" },
  { name: "catchment.shp / .dbf / .shx / .prj", status: "ok", note: "Shapefile complete → indexed" },
  { name: "survey_points.laz", status: "ok", note: "LiDAR → converted to COPC" },
  { name: "levees.shp", status: "warn", note: "Missing .dbf and .shx — upload the full shapefile set" },
];

export default function NewRepoPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [created, setCreated] = useState(false);
  const [progress, setProgress] = useState(0);

  function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreated(true);
    let p = 0;
    const t = setInterval(() => {
      p += 20;
      setProgress(Math.min(p, 100));
      if (p >= 100) clearInterval(t);
    }, 220);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-10 md:px-6">
        <h1 className="font-serif text-3xl font-semibold">Create a new repository</h1>
        <p className="mt-2 text-muted-foreground">A repository holds your project&apos;s files and their full version history.</p>

        {!created ? (
          <Card className="mt-8">
            <CardContent>
              <form onSubmit={onCreate}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="owner">Owner / repository name</FieldLabel>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="hydrolab">
                        <SelectTrigger id="owner" className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="hydrolab">hydrolab</SelectItem>
                            <SelectItem value="priyam">priyam</SelectItem>
                            <SelectItem value="deltares">deltares</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <span className="text-muted-foreground">/</span>
                      <Input
                        placeholder="chalakudy-basin"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <FieldDescription>Great repository names are short and memorable.</FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="desc">Description</FieldLabel>
                    <Textarea id="desc" placeholder="Calibrated HEC-RAS model and terrain data for…" rows={3} />
                  </Field>

                  <FieldSet>
                    <FieldLegend>Visibility</FieldLegend>
                    <RadioGroup defaultValue="public" className="gap-3">
                      <FieldLabel htmlFor="v-public" className="flex items-start gap-3 rounded-lg border border-border p-3">
                        <RadioGroupItem value="public" id="v-public" className="mt-0.5" />
                        <span className="flex flex-col gap-0.5">
                          <span className="font-medium">Public</span>
                          <span className="text-sm text-muted-foreground">Anyone can see and fork this repository.</span>
                        </span>
                      </FieldLabel>
                      <FieldLabel htmlFor="v-private" className="flex items-start gap-3 rounded-lg border border-border p-3">
                        <RadioGroupItem value="private" id="v-private" className="mt-0.5" />
                        <span className="flex flex-col gap-0.5">
                          <span className="font-medium">Private</span>
                          <span className="text-sm text-muted-foreground">Only you and members you invite can access it.</span>
                        </span>
                      </FieldLabel>
                    </RadioGroup>
                  </FieldSet>

                  <Field orientation="horizontal">
                    <Button type="submit">Create repository</Button>
                    <Button type="button" variant="ghost" onClick={() => router.push("/dashboard")}>
                      Cancel
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-8 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Push your first project</CardTitle>
                <CardDescription>Use the Beacon CLI from your project directory.</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm">
{`beacon init ${name || "chalakudy-basin"}
beacon remote add origin beacon.dev/hydrolab/${name || "chalakudy-basin"}
beacon add .
beacon commit -m "Initial import"
beacon push -u origin main`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Or drag &amp; drop files</CardTitle>
                <CardDescription>Files are chunked and format-normalized in your browser before upload.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border bg-muted/20 p-8 text-center">
                  <CloudUpload className="size-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Drop DEM, shapefile, LiDAR, or model files here</p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Uploading &amp; processing…</span>
                    <span className="font-mono">{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>

                {progress >= 100 && (
                  <>
                    <Separator />
                    <div className="flex flex-col gap-2">
                      {ingest.map((f) => (
                        <div key={f.name} className="flex items-start gap-2 text-sm">
                          {f.status === "ok" ? (
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-chart-2" />
                          ) : (
                            <FileWarning className="mt-0.5 size-4 shrink-0 text-chart-4" />
                          )}
                          <span>
                            <span className="font-mono">{f.name}</span>
                            <span className="block text-xs text-muted-foreground">{f.note}</span>
                          </span>
                        </div>
                      ))}
                      <div className="mt-2 flex items-center gap-2 rounded-md border border-chart-4/30 bg-chart-4/10 p-3 text-sm">
                        <AlertTriangle className="size-4 shrink-0 text-chart-4" />
                        <span>1 file has an incomplete shapefile set. It won&apos;t be versioned until completed.</span>
                        <Badge variant="outline" className="ml-auto">1 flagged</Badge>
                      </div>
                    </div>
                    <Button onClick={() => router.push("/hydrolab/chalakudy-basin")}>Go to repository</Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
}
