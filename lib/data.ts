// Shared mock data for Beacon — a version-control platform for hydro/GIS engineers.
// Everything here is illustrative sample content used to render the UI.

export type DataType =
  | "DEM"
  | "Shapefile"
  | "LiDAR"
  | "NetCDF"
  | "HEC-RAS"
  | "HEC-HMS"
  | "SWMM"
  | "EPANET"
  | "GeoTIFF"
  | "Zarr";

export const dataTypeColors: Record<DataType, string> = {
  DEM: "bg-chart-1/15 text-chart-1 border-chart-1/30",
  Shapefile: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  LiDAR: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  NetCDF: "bg-chart-4/15 text-chart-4 border-chart-4/30",
  "HEC-RAS": "bg-chart-5/15 text-chart-5 border-chart-5/30",
  "HEC-HMS": "bg-chart-5/15 text-chart-5 border-chart-5/30",
  SWMM: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  EPANET: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  GeoTIFF: "bg-chart-1/15 text-chart-1 border-chart-1/30",
  Zarr: "bg-chart-4/15 text-chart-4 border-chart-4/30",
};

export type Repo = {
  owner: string;
  name: string;
  description: string;
  tags: DataType[];
  size: string;
  updated: string;
  visibility: "public" | "private";
  stars: number;
  forks: number;
  region: string;
  defaultBranch: string;
  forkedFrom?: string;
};

export const repos: Repo[] = [
  {
    owner: "hydrolab",
    name: "chalakudy-basin",
    description:
      "Calibrated HEC-RAS model and terrain data for the Chalakudy river basin, Kerala.",
    tags: ["HEC-RAS", "DEM", "Shapefile"],
    size: "4.2 GB",
    updated: "3 hours ago",
    visibility: "public",
    stars: 214,
    forks: 38,
    region: "Kerala, India",
    defaultBranch: "main",
  },
  {
    owner: "openterrain",
    name: "srtm-30m-global",
    description:
      "Deduplicated SRTM 30m elevation tiles served as Cloud-Optimized GeoTIFFs.",
    tags: ["DEM", "GeoTIFF"],
    size: "812 GB",
    updated: "2 days ago",
    visibility: "public",
    stars: 1902,
    forks: 401,
    region: "Global",
    defaultBranch: "main",
  },
  {
    owner: "deltares",
    name: "rhine-meuse-swmm",
    description: "Urban drainage SWMM models for the Rhine–Meuse delta cities.",
    tags: ["SWMM", "Shapefile"],
    size: "1.1 GB",
    updated: "5 days ago",
    visibility: "public",
    stars: 143,
    forks: 22,
    region: "Netherlands",
    defaultBranch: "main",
  },
  {
    owner: "usgs-water",
    name: "colorado-lidar-2024",
    description: "Classified LiDAR point clouds (COPC) for the Colorado front range.",
    tags: ["LiDAR"],
    size: "62 GB",
    updated: "1 week ago",
    visibility: "public",
    stars: 511,
    forks: 74,
    region: "Colorado, USA",
    defaultBranch: "main",
  },
  {
    owner: "hydrolab",
    name: "monsoon-rainfall-grids",
    description: "NetCDF rainfall reanalysis grids (1990–2024) stored as Zarr.",
    tags: ["NetCDF", "Zarr"],
    size: "28 GB",
    updated: "1 day ago",
    visibility: "public",
    stars: 88,
    forks: 12,
    region: "South Asia",
    defaultBranch: "main",
  },
  {
    owner: "hydrolab",
    name: "internal-flood-forecast",
    description: "Operational flood-forecast pipeline configs and calibration runs.",
    tags: ["HEC-HMS", "EPANET"],
    size: "640 MB",
    updated: "6 hours ago",
    visibility: "private",
    stars: 0,
    forks: 0,
    region: "Kerala, India",
    defaultBranch: "develop",
  },
];

export function getRepo(owner: string, name: string): Repo {
  return (
    repos.find((r) => r.owner === owner && r.name === name) ?? {
      ...repos[0],
      owner,
      name,
    }
  );
}

export type FileNode = {
  name: string;
  type: "dir" | "raster" | "vector" | "table" | "text" | "model";
  size: string;
  lastCommit: string;
  updated: string;
  dataType?: DataType;
};

export const fileTree: FileNode[] = [
  { name: "terrain", type: "dir", size: "—", lastCommit: "Re-tile DEM to COG", updated: "3 hours ago" },
  { name: "vectors", type: "dir", size: "—", lastCommit: "Add levee centerlines", updated: "2 days ago" },
  { name: "model", type: "dir", size: "—", lastCommit: "Recalibrate Manning's n", updated: "3 hours ago" },
  {
    name: "basin_dem.tif",
    type: "raster",
    size: "2.8 GB",
    lastCommit: "Re-tile DEM to COG",
    updated: "3 hours ago",
    dataType: "DEM",
  },
  {
    name: "catchment.shp",
    type: "vector",
    size: "14 MB",
    lastCommit: "Fix sub-catchment topology",
    updated: "2 days ago",
    dataType: "Shapefile",
  },
  {
    name: "gauges.csv",
    type: "table",
    size: "82 KB",
    lastCommit: "Add 2024 gauge readings",
    updated: "4 days ago",
  },
  {
    name: "model.p01",
    type: "model",
    size: "3.1 MB",
    lastCommit: "Recalibrate Manning's n",
    updated: "3 hours ago",
    dataType: "HEC-RAS",
  },
  {
    name: "README.md",
    type: "text",
    size: "6 KB",
    lastCommit: "Document calibration assumptions",
    updated: "1 week ago",
  },
];

export const readmeContent = `# Chalakudy Basin Model

Calibrated 2D HEC-RAS model of the Chalakudy river basin covering the reach from
Peringalkuthu to the estuary. Terrain is derived from a 2023 LiDAR survey resampled
to a 2 m DEM and stored as a Cloud-Optimized GeoTIFF.

## Contents
- \`terrain/basin_dem.tif\` — 2 m bare-earth DEM (COG)
- \`vectors/catchment.shp\` — sub-catchment boundaries
- \`model/model.p01\` — HEC-RAS plan, 100-yr event

## Calibration
Manning's n values were calibrated against the 2018 flood high-water marks. See the
wiki for the full methodology and gauge locations.`;

export type Commit = {
  sha: string;
  message: string;
  author: string;
  authorHandle: string;
  timestamp: string;
  sizeDelta: string;
  branch?: string;
  files: {
    name: string;
    dataType?: DataType;
    added: number;
    changed: number;
    removed: number;
    unit: "tiles" | "features" | "rows" | "cells";
  }[];
};

export const commits: Commit[] = [
  {
    sha: "a1b2c3d",
    message: "Re-tile DEM to Cloud-Optimized GeoTIFF",
    author: "Priya Menon",
    authorHandle: "priyam",
    timestamp: "3 hours ago",
    sizeDelta: "+42 MB",
    files: [
      { name: "terrain/basin_dem.tif", dataType: "DEM", added: 1240, changed: 320, removed: 0, unit: "tiles" },
    ],
  },
  {
    sha: "e4f5g6h",
    message: "Recalibrate Manning's n for main channel",
    author: "Arun Nair",
    authorHandle: "arunn",
    timestamp: "3 hours ago",
    sizeDelta: "+11 KB",
    files: [
      { name: "model/model.p01", dataType: "HEC-RAS", added: 0, changed: 18, removed: 0, unit: "cells" },
    ],
  },
  {
    sha: "i7j8k9l",
    message: "Fix sub-catchment topology near confluence",
    author: "Priya Menon",
    authorHandle: "priyam",
    timestamp: "2 days ago",
    sizeDelta: "-2 MB",
    files: [
      { name: "vectors/catchment.shp", dataType: "Shapefile", added: 4, changed: 12, removed: 7, unit: "features" },
    ],
  },
  {
    sha: "m1n2o3p",
    message: "Add 2024 gauge readings",
    author: "Sara Thomas",
    authorHandle: "sarat",
    timestamp: "4 days ago",
    sizeDelta: "+22 KB",
    files: [
      { name: "gauges.csv", added: 1460, changed: 0, removed: 0, unit: "rows" },
    ],
  },
  {
    sha: "q4r5s6t",
    message: "Add levee centerlines from 2024 survey",
    author: "Arun Nair",
    authorHandle: "arunn",
    timestamp: "5 days ago",
    sizeDelta: "+3 MB",
    files: [
      { name: "vectors/levees.shp", dataType: "Shapefile", added: 86, changed: 0, removed: 0, unit: "features" },
    ],
  },
  {
    sha: "u7v8w9x",
    message: "Document calibration assumptions",
    author: "Priya Menon",
    authorHandle: "priyam",
    timestamp: "1 week ago",
    sizeDelta: "+4 KB",
    files: [{ name: "README.md", added: 62, changed: 4, removed: 1, unit: "rows" }],
  },
];

export type Branch = {
  name: string;
  lastCommit: string;
  author: string;
  updated: string;
  ahead: number;
  behind: number;
  isDefault?: boolean;
};

export const branches: Branch[] = [
  { name: "main", lastCommit: "Re-tile DEM to COG", author: "priyam", updated: "3 hours ago", ahead: 0, behind: 0, isDefault: true },
  { name: "develop", lastCommit: "Recalibrate Manning's n", author: "arunn", updated: "3 hours ago", ahead: 6, behind: 1 },
  { name: "levee-scenario", lastCommit: "Add levee centerlines", author: "arunn", updated: "5 days ago", ahead: 3, behind: 4 },
  { name: "lidar-2024-update", lastCommit: "Ingest new LiDAR tiles", author: "sarat", updated: "1 week ago", ahead: 12, behind: 8 },
];

export type PullRequest = {
  id: number;
  title: string;
  author: string;
  source: string;
  target: string;
  status: "open" | "merged" | "changes-requested" | "approved";
  comments: number;
  updated: string;
  description: string;
};

export const pullRequests: PullRequest[] = [
  {
    id: 142,
    title: "Levee scenario: raise embankment crest by 0.5 m",
    author: "arunn",
    source: "levee-scenario",
    target: "main",
    status: "open",
    comments: 7,
    updated: "2 hours ago",
    description:
      "Proposes an updated levee geometry and re-runs the 100-yr event. Reduces inundation extent on the right bank by ~18%.",
  },
  {
    id: 139,
    title: "Ingest 2024 LiDAR and rebuild 2 m DEM",
    author: "sarat",
    source: "lidar-2024-update",
    target: "main",
    status: "changes-requested",
    comments: 12,
    updated: "1 day ago",
    description: "Replaces the 2023 terrain with the 2024 survey. Awaiting resolution of the datum offset.",
  },
  {
    id: 131,
    title: "Recalibrate Manning's n for main channel",
    author: "arunn",
    source: "develop",
    target: "main",
    status: "merged",
    comments: 4,
    updated: "3 days ago",
    description: "Calibrated against 2018 high-water marks. Nash–Sutcliffe improved from 0.71 to 0.86.",
  },
];

export type Issue = {
  id: number;
  title: string;
  author: string;
  status: "open" | "closed";
  label: "data-quality" | "question" | "enhancement" | "bug";
  comments: number;
  updated: string;
  reference?: string;
};

export const issues: Issue[] = [
  { id: 88, title: "Datum mismatch between 2023 and 2024 DEM", author: "sarat", status: "open", label: "data-quality", comments: 9, updated: "5 hours ago", reference: "terrain/basin_dem.tif" },
  { id: 84, title: "Should gauges.csv include provisional readings?", author: "priyam", status: "open", label: "question", comments: 3, updated: "2 days ago", reference: "gauges.csv" },
  { id: 80, title: "Add a downstream boundary condition option", author: "arunn", status: "open", label: "enhancement", comments: 5, updated: "4 days ago" },
  { id: 76, title: "Sub-catchment 12 has a topology gap", author: "priyam", status: "closed", label: "bug", comments: 6, updated: "1 week ago", reference: "vectors/catchment.shp" },
];

export type Release = {
  version: string;
  title: string;
  sha: string;
  date: string;
  author: string;
  notes: string;
  size: string;
  latest?: boolean;
};

export const releases: Release[] = [
  {
    version: "v1.2.0",
    title: "Chalakudy basin model v1.2 — 2024 terrain",
    sha: "a1b2c3d",
    date: "Mar 14, 2026",
    author: "priyam",
    notes: "Rebuilt DEM from 2024 LiDAR, recalibrated Manning's n, added levee centerlines.",
    size: "4.2 GB",
    latest: true,
  },
  {
    version: "v1.1.0",
    title: "Chalakudy basin model v1.1",
    sha: "i7j8k9l",
    date: "Jan 8, 2026",
    author: "arunn",
    notes: "Fixed sub-catchment topology and added 2024 gauge readings.",
    size: "4.1 GB",
  },
  {
    version: "v1.0.0",
    title: "Chalakudy basin model v1.0",
    sha: "u7v8w9x",
    date: "Nov 2, 2025",
    author: "priyam",
    notes: "First calibrated release against the 2018 flood event.",
    size: "3.9 GB",
  },
];

export type Activity = {
  type: "commit" | "branch" | "comment" | "pr" | "mention" | "release";
  actor: string;
  text: string;
  repo: string;
  time: string;
  read?: boolean;
};

export const activityFeed: Activity[] = [
  { type: "commit", actor: "priyam", text: "pushed 2 commits to", repo: "hydrolab/chalakudy-basin", time: "3 hours ago", read: false },
  { type: "pr", actor: "arunn", text: "opened pull request #142 on", repo: "hydrolab/chalakudy-basin", time: "2 hours ago", read: false },
  { type: "comment", actor: "sarat", text: "commented on issue #88 in", repo: "hydrolab/chalakudy-basin", time: "5 hours ago", read: false },
  { type: "mention", actor: "arunn", text: "mentioned you in a review on", repo: "deltares/rhine-meuse-swmm", time: "1 day ago", read: true },
  { type: "branch", actor: "sarat", text: "created branch lidar-2024-update on", repo: "hydrolab/chalakudy-basin", time: "1 week ago", read: true },
  { type: "release", actor: "priyam", text: "published release v1.2.0 of", repo: "hydrolab/chalakudy-basin", time: "1 week ago", read: true },
];

export type Member = {
  handle: string;
  name: string;
  role: "Owner" | "Maintainer" | "Member";
  repos: number;
};

export const orgMembers: Member[] = [
  { handle: "priyam", name: "Priya Menon", role: "Owner", repos: 14 },
  { handle: "arunn", name: "Arun Nair", role: "Maintainer", repos: 9 },
  { handle: "sarat", name: "Sara Thomas", role: "Member", repos: 5 },
  { handle: "vikramr", name: "Vikram Rao", role: "Member", repos: 3 },
];

export const tokens = [
  { name: "beacon-cli (laptop)", created: "Jan 12, 2026", lastUsed: "2 hours ago", scope: "repo, read:org" },
  { name: "ci-pipeline", created: "Nov 30, 2025", lastUsed: "1 day ago", scope: "repo" },
  { name: "qgis-plugin", created: "Sep 4, 2025", lastUsed: "3 weeks ago", scope: "read:repo" },
];

export const sshKeys = [
  { name: "workstation", fingerprint: "SHA256:9zX…hd4", created: "Jan 12, 2026", lastUsed: "2 hours ago" },
  { name: "field-laptop", fingerprint: "SHA256:2aQ…k7P", created: "Oct 21, 2025", lastUsed: "5 days ago" },
];

export const contributionActivity = [
  "commit", "commit", "pr", "commit", "comment", "commit", "release",
  "commit", "commit", "commit", "pr", "commit", "comment", "commit",
];

export const commitActivity = [
  { week: "W1", commits: 12 },
  { week: "W2", commits: 19 },
  { week: "W3", commits: 8 },
  { week: "W4", commits: 24 },
  { week: "W5", commits: 16 },
  { week: "W6", commits: 31 },
  { week: "W7", commits: 22 },
  { week: "W8", commits: 27 },
];
