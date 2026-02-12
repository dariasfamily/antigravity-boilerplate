# DASHBOARD V3: BACKEND-TO-FRONTEND MAPPING
> The "Glass Cockpit" Blueprint.
> Maps every backend byte to a frontend pixel.

## 1. Global System Telemetry (The "Heads-Up Display")
Source: `SystemContext` & `AgentRunner (StandardEnvelope)`

| Backend Field | Source | Frontend Component | Viz Type | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `envelope.meta.trace_id` | `StandardEnvelope` | `TraceMonitor` | `string (hash)` | Click to copy. Shows valid W3C trace. |
| `envelope.meta.execution_time_ms` | `StandardEnvelope` | `LatencyGraph` | `number (ms)` | Red if > 5000ms. Real-time chart. |
| `systemContext.active_agent` | `SystemContext` | `SystemStatusBadge` | `Badge` | Shows which agent is "Thinking". |
| `systemContext.session_id` | `SystemContext` | `SessionInfo` | `string` | Display in header. |

## 2. ORION (The Strategist)
Source: `OrionLogic.ts` -> `OrionIngest` (Input) -> `OrionOutput` (Output)

### 2.1 INPUT IMPULSE (Control Panel)
| Backend Field | Type | Frontend Component | Interaction |
| :--- | :--- | :--- | :--- |
| `topic_keywords` | `string[]` | `TopicMatrix` | Dynamic Chip Input (Add/Remove) |
| `target_platform` | `string` | `PlatformSelector` | Icon Grid (YT/TikTok/LinkedIn) |
| `brand_profile.tone` | `string` | `ToneSlider` | Range/Select (Authoritative -> Gonzo) |
| `production_constraints.budget` | `string` | `BudgetSwitch` | Low/Mid/High Toggle |

### 2.2 PROCESSING VISUALIZATION (Neural Scan)
*Triggered when status = 'active'*
- **Visual**: Rotating "Radar" scan over the `TopicMatrix`.
- **Text**: "ANALYZING MARKET VECTORS..." (from `OrionLogic` phases)

### 2.3 OUTPUT: THE MANIFEST (Success State)
Source: `OrionManifest`

| Backend Field | Logic | Frontend Component | Viz Type |
| :--- | :--- | :--- | :--- |
| `meta.predicted_virality` | `number (0-10)` | `ViralityScore` | Big Number + Color Scale (Red < 5, Green > 8) |
| `meta.trend_direction` | `enum` | `TrendIndicator` | Arrow Icon (📈/📉/➡️) |
| `core_concept.title_variations` | `string[]` | `TitleCards` | Carousel or List (Selectable) |
| `hooks.primary.script_variants` | `string[]` | `HookPreview` | Highlighted Text Box |
| `financial_projection.estimated_rpm` | `number` | `RevenueProjector` | "$XX.XX RPM" Badge |

### 2.4 OUTPUT: THE REJECTED PILE (Discovery)
Source: `OrionOutput.rejected`
*Why? To allow user to rescue good ideas that failed strict filters.*

| Backend Field | Frontend Component |
| :--- | :--- |
| `term` | `GhostCard` (Dimmed) |
| `reason` | Tooltip ("Low Virality", "Brand Unsafe") |
| `score` | Small text |

## 3. CALLIOPE (The Creator)
Source: `CalliopeLogic.ts` -> `CalliopeIngest` (Manifest) -> `CalliopeOutput` (Script)

### 3.1 INPUT STATE (Waiting)
- **Visual**: "Awaiting Handoff".
- **Data Needed**: `OrionManifest` (from Context).
- **Action**: "Import Strategy" button (if manual) or Auto-Start.

### 3.2 OUTPUT: THE SCRIPT (Editor)
Source: `CalliopeOutput`

| Backend Field | Frontend Component | Interaction |
| :--- | :--- | :--- |
| `final_script` | `ScriptEditor` | Markdown Editor (Monaco/Simple) |
| `scenes` | `StoryboardStrip` | Side-by-side Visual/Audio Prompts |
| `estimated_duration` | `TimeBudget` | "XX Seconds" (Red if > Platform Limit) |

## 4. AUDIT & TRUST (The "Black Box" Recorder)
Source: `TripleJustification` (from `AgentRunner.envelope.audit`)

| Backend Field | Frontend Component | Viz Type |
| :--- | :--- | :--- |
| `identity` | `AgentSignature` | "Signed by Orion V3.4" |
| `math` | `LogicProof` | Small breakdown ("Score 9.5 > Threshold 7.0") |
| `knowledge` | `CitationLink` | "Based on 3 analyzed concepts" |

## 5. NEW DASHBOARD STRUCTURE (Component Tree)
```mermaid
graph TD
    A[Dashboard Page] --> B[GlobalHeader]
    B --> B1[SessionID]
    B2[SystemHealth]
    
    A --> C[GlassCockpit Grid]
    
    C --> D[OrionModule]
    D --> D1[InputMatrix]
    D --> D2[ManifestCard]
    D --> D3[RejectedList]
    
    C --> E[CalliopeModule]
    E --> E1[ScriptEditor]
    E --> E2[Storyboard]
    
    A --> F[TelemetryDock (Bottom)]
    F --> F1[LiveLogs]
    F --> F2[TraceInspector]
```
