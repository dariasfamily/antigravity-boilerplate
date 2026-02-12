# 🧬 VIDEO ANATOMY TECHNICAL SPECIFICATION [L-6]
**Classification:** TECHNICAL_DEEP_DIVE
**Source:** AXON RESEARCH THREAD
**Status:** REFERENCE_MASTER

This document defines the technical structure of a digital video file, from the atomic bit level to the container level (Micro to Macro).

---

## 1. LAYER 0: THE ATOMIC LEVEL (Micro)
**The Raw Data Units**

### 1.1 The Pixel (Picture Element)
*   **Definition:** The smallest addressable element in a raster image.
*   **Composition:** typically 3 channels (Red, Green, Blue) or YUV (Luma, Chroma Blue, Chroma Red).
*   **Bit Depth:** 
    *   **8-bit:** 256 levels per channel (16.7M colors). Standard Rec.709.
    *   **10-bit:** 1024 levels per channel (1.07B colors). Essential for HDR (Rec.2020).
    *   **12-bit/16-bit:** Cinema archival quality.

### 1.2 Chroma Subsampling (YUV)
Compression technique that reduces color resolution while keeping brightness (Luma) intact.
*   **4:4:4:** No compression. Every pixel has full color data. (Cinema/VFX).
*   **4:2:2:** Half chroma resolution horizontally. (Broadcast/ProRes).
*   **4:2:0:** Quarter chroma resolution. (Web/Consumer - MP4, YouTube, Blu-ray). *Most common target.*

---

## 2. LAYER 1: THE COMPRESSION BLOCK (Mesh)
**How encoding algorithms "see" the image.**

### 2.1 Macroblocks (H.264 / AVC)
*   **Size:** Fixed 16x16 pixel grid.
*   **Function:** The encoder analyzes these blocks for redundancy.
*   **Operation:** If a block hasn't changed from the previous frame, it isn't saved again; only a "vector" tells the player to "move this block here".

### 2.2 Coding Tree Units (H.265 / HEVC)
*   **Size:** Variable (16x16 up to 64x64).
*   **Advantage:** More efficient than Macroblocks. Can use large blocks for flat backgrounds (sky) and tiny blocks for detail (grass), saving massive bandwidth.

### 2.3 Slices
*   **Definition:** A horizontal collection of Macroblocks/CTUs.
*   **Purpose:** Error resilience and parallel processing. If one slice is corrupted, the rest of the image might still load.

---

## 3. LAYER 2: THE TEMPORAL STRUCTURE (Flow)
**How images move through time.**

### 3.1 Frame Types
*   **I-Frame (Intra):** A full, self-contained image (JPEG-like). Keyframe. Heavy size.
*   **P-Frame (Predicted):** Stores only the *changes* from the previous frame.
*   **B-Frame (Bi-directional):** Looks forward and backward. Highly compressed. "This pixel is an average of the previous frame and the future frame."

### 3.2 GOP (Group of Pictures)
*   **Structure:** The pattern of I, P, and B frames.
*   **Closed GOP:** Standard (e.g., `IBBPBBP...`). Starts with an I-Frame.
*   **Long GOP:** Used in streaming/XAVC-S. Fewer I-frames = smaller file, harder to edit.
*   **All-Intra:** Every frame is an I-Frame (ProRes, DNxHR). Huge file, easiest to edit.

---

## 4. LAYER 3: THE BITSTREAM (Codec)
**The language of the data.**

### 4.1 NAL Units (Network Abstraction Layer)
The raw packetized video stream. A continuous flow of binary data containing the Slices and Frames defined above.
*   **SPS (Sequence Parameter Set):** Metadata header (Resolution, Profile, Level).
*   **PPS (Picture Parameter Set):** Entropy coding mode, slice groups.

### 4.2 Codecs (The Engineer)
*   **H.264 (AVC):** The compatibility king. High efficiency, ubiquitous.
*   **H.265 (HEVC):** 50% better compression than H.264. Harder to encode/decode.
*   **AV1:** Open source, royalty-free, highly efficient. Future of web.
*   **ProRes / DNxHR:** Intermediate codecs. Low compression, high bitrate, optimized for editing performance (CPU/GPU friendly).

---

## 5. LAYER 4: THE CONTAINER (Macro)
**The File Box (.mp4, .mov, .mkv)**

### 5.1 Atoms / Boxes (ISO Base Media File Format)
The file structure is a tree of "Boxes".
*   `ftyp`: File Type (Who am I? MP4 v2).
*   `moov`: **Movie Atom** (The Metadata Index). Contains specific locations of every frame. *Critical: If this is corrupt, the file is unplayable.*
    *   `mvhd`: Movie Header (Duration, Scale).
    *   `trak`: Individual Tracks (Video, Audio 1, Audio 2, Subtitles).
*   `mdat`: **Media Data** (The Bulk). The actual specialized binary blob of Video/Audio streams.

### 5.2 Streams (Muxing)
Multiple streams are "Interleaved" (Muxed) into the container.
*   **Video Stream:** (e.g., HEVC).
*   **Audio Stream:** (e.g., AAC, PCM).
*   **Data Stream:** (e.g., Timecode, Closed Captions, G-Metrix).

---

## 🔍 SUMMARY FOR AGENTS
*   **To BUILD an Editor:** You must manipulate the **MOOV Atom** to re-arrange playback without re-rendering pixels (Smart Rendering).
*   **To FILTER Video:** You process the **Pixel Level** (Shaders/LUTs).
*   **To CUT Video:** You align cuts to **I-Frames** (GOP boundary) or force re-encoding of the GOP.
