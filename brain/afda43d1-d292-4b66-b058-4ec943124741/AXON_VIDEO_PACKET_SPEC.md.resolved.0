# 📦 AXON VIDEO PACKET SPECIFICATION (AVPOS-V1)
**Classification:** TECHNICAL_SCHEMA
**Target:** HEPHAESTUS (Automator)
**Status:** ACTIVE

This document defines the **JSON Object Structure** that constitutes a complete "Video Production Packet". All Agents must output their work into this standardized format.

---

## 1. THE ROOT OBJECT
```json
{
  "project_id": "UUID-V4",
  "title": "Working Title",
  "meta_data": {
    "target_audience": "Tech Enthusiasts",
    "platform": "YouTube",
    "format": "16:9",
    "resolution": "4K"
  },
  "narrative_layer": {},    // Owner: PLANNER
  "visual_layer": {},       // Owner: THALIA
  "audio_layer": {},        // Owner: APOLLO
  "assembly_layer": {},     // Owner: HEPHAESTUS
  "distribution_layer": {}  // Owner: NEXUS
}
```

---

## 2. NARRATIVE LAYER (The Spine)
**Owner:** [AXON-CORE] PLANNER
**Brain:** `[AXON-CORE] PLANNER`
**Skills:** `story-arc-architect`

```json
"narrative_layer": {
  "script": {
    "dialogue_lines": [
      { "actor": "Host", "timecode": "00:00:05", "text": "Hook line..." }
    ],
    "voice_over": [
      { "actor": "Apollo-v2", "timecode": "00:01:20", "text": "Explanation..." }
    ]
  },
  "structure": {
    "hook_type": "Pattern Interrupt",
    "inciting_incident_tc": "00:00:45",
    "climax_tc": "00:08:30",
    "cta_type": "Soft Sell",
    "emotional_arc": ["Curiosity", "Frustration", "Revelation", "Satisfaction"]
  },
  "value_proposition": "Practical tutorial on X"
}
```

---

## 3. VISUAL LAYER (The Eye)
**Owner:** [AXON-MEDIA] THALIA (Director) + PIXEL (Stills) + FRAME (Motion)
**Brain:** `[AXON-MEDIA] THALIA`
**Skills:** `visual-director`, `flux-pro-1.1`, `runway-gen-3`

```json
"visual_layer": {
  "style_guide": {
    "palette": ["#000000", "#00FF00", "#1A1A1A"], // Neon Green
    "lighting": "Cyberpunk / High Contrast",
    "font_family": "Inter/Roboto Mono"
  },
  "assets": [
    {
      "type": "b_roll",
      "source": "FRAME_GEN_ID_123",
      "description": "Drone shot of futuristic city",
      "duration": "5s"
    },
    {
      "type": "overlay_image",
      "source": "PIXEL_GEN_ID_456",
      "description": "Diagram of Neural Net",
      "position": "center"
    }
  ],
  "sequences": [
    {
      "id": "seq_01",
      "shot_type": "Wide",
      "angle": "Low Angle",
      "movement": "Dolly In",
      "content": "Host walking towards camera"
    }
  ],
  "easter_eggs": [
    { "frame": "00:03:12", "content": "Hidden QR Code" }
  ]
}
```

---

## 4. AUDIO LAYER (The Ear)
**Owner:** [AXON-MEDIA] APOLLO
**Brain:** `[AXON-MEDIA] APOLLO`
**Skills:** `audio-engineer`, `voice-synthesis`

```json
"audio_layer": {
  "mix_settings": {
    "dialogue_level": "-12dB",
    "music_ducking": "-18dB",
    "lufs_target": "-14 LUFS"
  },
  "tracks": [
    {
      "type": "music",
      "file": "APOLLO_MUSIC_ID_789.wav",
      "genre": "Synthwave",
      "tempo": "120 BPM",
      "purpose": "Driving Energy"
    },
    {
      "type": "sfx",
      "file": "SFX_GLITCH_01.wav",
      "timecode": "00:00:05",
      "category": "Transition"
    },
    {
      "type": "ambience",
      "file": "BG_SERVER_ROOM.wav",
      "loop": true
    }
  ]
}
```

---

## 5. ASSEMBLY LAYER (The Build)
**Owner:** [AXON-INFRA] HEPHAESTUS
**Brain:** `[AXON-INFRA] HEPHAESTUS`
**Skills:** `ffmpeg-master`, `automation-architect`

```json
"assembly_layer": {
  "timeline": {
    "framerate": 60,
    "total_duration": "00:10:00",
    "cuts": [
      { "in": "00:00:00", "out": "00:00:05", "source": "seq_01" }
    ]
  },
  "processing": {
    "color_grade_lut": "Matrix_Green_v2.cube",
    "watermark": {
      "image": "AXON_LOGO_WHITE.png",
      "opacity": 0.3,
      "position": "bottom-right"
    },
    "subtitles": {
      "font": "Arial",
      "style": "Karaoke",
      "burn_in": true
    }
  },
  "export": {
    "codec": "h264",
    "container": "mp4",
    "bitrate": "45Mbps"
  }
}
```

---

## 6. DISTRIBUTION LAYER (The Reach)
**Owner:** [AXON-CORE] NEXUS
**Brain:** `[AXON-CORE] NEXUS`
**Skills:** `youtube-growth`, `social-publishing`

```json
"distribution_layer": {
  "metadata": {
    "title_optimized": "I Built a Video Editor with AI (The Truth)",
    "description_layers": {
      "hook": "Ever wondered how AI sees video?",
      "links": ["https://axon.system"],
      "timestamps": true
    },
    "tags": ["AI", "Video Editing", "Future"],
    "thumbnail_id": "PIXEL_THUMB_V3.png"
  },
  "strategy": {
    "platform": "YouTube",
    "publish_time": "Tuesday 10:00 AM EST",
    "first_comment": "Ask me anything about Agent L-6!"
  },
  "monetization": {
    "affiliate_links": ["stripe_payment_link_id"],
    "cta_overlay": "Buy Now"
  }
}
```
