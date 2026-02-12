"""
ARGUS AGENT HANDLER (brand_argus_handler.py)
Version: 1.0
Role: Systems Auditor & Quality Assurance
Mission: "Trust, but Verify."

This script implements the deterministic finite state machine defined in ARGUS_PROTOCOL.md.
It acts as the Gatekeeper between Calliope (Scripting) and Production/Distribution.
"""

import json
import uuid
import datetime
import re
import sys 
from typing import Dict, List, Any, Optional

# ==============================================================================
# 1. INTERNAL KNOWLEDGE BASE (Simplified for Handler)
# ==============================================================================

BRAND_SAFETY_RULES = {
    "PROFANITY_CHECK": {"threshold": 1, "action": "AUTOFIX", "desc": "No profanity in first 15s"},
    "HATE_SPEECH": {"threshold": 0, "action": "REJECT", "desc": "Zero tolerance for hate speech"},
}

SEO_RULES = {
    "TITLE_LENGTH": {"min": 30, "max": 70, "action": "AUTOFIX"},
    "KEYWORD_DENSITY": {"min": 1.5, "target_location": "first_sentence"},
    "INFLESZ_THRESHOLD": 55
}

# ==============================================================================
# 2. MOCK EXTERNAL TOOLS (Simulating API Calls)
# ==============================================================================

class ToolKit:
    def scan_profanity(text: str) -> List[Dict]:
        """Simulates finding profanity."""
        forbidden = ["badword", "damn", "hell"]
        flags = []
        for word in forbidden:
            if word in text.lower():
                flags.append({"type": "profanity", "word": word, "severity": "low"})
        return flags

    def check_fact_validity(claim: str) -> int:
        """Simulates RAG Fact Check. Returns Label 0 (Support), 1 (Refute), 6 (NEI)."""
        # Mock logic: If claim contains "fake", Refute. If "maybe", NEI. Else Support.
        if "fake" in claim.lower(): return 1
        if "maybe" in claim.lower(): return 6
        return 0

    def calculate_inflesz(text: str) -> float:
        """Calculates INFLESZ Readability Score for Spanish."""
        # Mock calculation based on length
        return 60.0 # Returns a 'safe' number for mock

# ==============================================================================
# 3. ARGUS ENGINE (The Class)
# ==============================================================================

class ArgusAgent:
    def __init__(self):
        self.audit_id = f"audit_{uuid.uuid4().hex[:8]}"
        self.timestamp = datetime.datetime.now().isoformat()
        self.verdict = "PENDING"
        self.scores = {"brand_safety": 100, "seo": 0, "facts": 0, "readability": 0}
        self.logs = []
        self.edits = []

    def log(self, phase: str, message: str, status="INFO"):
        entry = f"[{phase}] {status}: {message}"
        print(entry, file=sys.stderr)
        self.logs.append(entry)

    def run_audit(self, script_json: Dict[str, Any]) -> Dict[str, Any]:
        """Main Execution Flow (5 Phases)"""
        self.log("INIT", f"Starting Audit {self.audit_id} for script: {script_json.get('title', 'Untitled')}")

        # PHASE 1: PRE-FLIGHT SAFETY
        if not self._phase_safety_check(script_json):
            return self._finalize_output("REJECT", ["Safety Violation"])

        # PHASE 2: TRUTH GROUNDING
        # Check if content_body exists, otherwise empty string
        content_body = script_json.get("content_body", "")
        fact_score = self._phase_fact_check(content_body)
        self.scores["facts"] = fact_score
        if fact_score < 50:
             return self._finalize_output("REJECT", ["Factual Hallucination Detected"])

        # PHASE 3: SEO OPTIMIZATION
        seo_score = self._phase_seo_check(script_json)
        self.scores["seo"] = seo_score

        # PHASE 4: EDITORIAL POLISH
        readability_score = self._phase_readability(content_body)
        self.scores["readability"] = readability_score

        # PHASE 5: VERDICT
        final_status = "PASS"
        if self.scores["seo"] < 80 or self.scores["readability"] < 55:
            final_status = "WARN"

        return self._finalize_output(final_status, [])

    # --- PHASE HELPERS ---

    def _phase_safety_check(self, script: Dict) -> bool:
        self.log("PHASE_1", "Scanning Brand Safety...")
        # Mock check
        flags = ToolKit.scan_profanity(script.get("content_body", ""))
        if flags:
            self.scores["brand_safety"] -= (len(flags) * 10)
            self.log("PHASE_1", f"Safety Flags Found: {len(flags)}", "WARN")
            # Logic: If hate speech, return False. Here we assume low severity profanity is fixable.
            return True 
        return True

    def _phase_fact_check(self, text: str) -> int:
        self.log("PHASE_2", "Verifying Factual Claims...")
        # Mock: Split sentences and check
        sentences = text.split(".")
        valid_claims = 0
        total_claims = 0
        for sent in sentences:
            if len(sent) > 10:
                total_claims += 1
                label = ToolKit.check_fact_validity(sent)
                if label == 0: valid_claims += 1
                elif label == 1: 
                    self.log("PHASE_2", f"Refuted Claim: {sent}", "ERROR")
                    return 0 # Immediate fail
        
        if total_claims == 0: return 100
        return int((valid_claims / total_claims) * 100)

    def _phase_seo_check(self, script: Dict) -> int:
        self.log("PHASE_3", "Optimizing SEO...")
        score = 100
        title = script.get("title", "")
        if len(title) > SEO_RULES["TITLE_LENGTH"]["max"]:
            self.edits.append({"field": "title", "original": title, "new": title[:65] + "..."})
            self.log("PHASE_3", "Trimming Title Length", "AUTOFIX")
            score -= 5
        return score

    def _phase_readability(self, text: str) -> int:
        self.log("PHASE_4", "Analyzing Readability (INFLESZ)...")
        score = int(ToolKit.calculate_inflesz(text))
        self.log("PHASE_4", f"INFLESZ Score: {score}")
        return score

    def _finalize_output(self, verdict: str, blockers: List[str]) -> Dict[str, Any]:
        output = {
            "ArgusOutput_Contract": {
                "meta_information": {
                    "audit_id": self.audit_id,
                    "timestamp": self.timestamp,
                    "script_version_audited": "v1.0"
                },
                "final_verdict": {
                    "status": verdict,
                    "confidence_score": 0.95,
                    "blocking_factors": blockers
                },
                "dimensional_scores": {
                    "brand_safety": {"score": self.scores["brand_safety"]},
                    "seo_performance": {"score": self.scores["seo"]},
                    "factual_integrity": {"score": self.scores["facts"]},
                    "readability_tone": {"inflesz_score": self.scores["readability"]}
                },
                "edits_optimizations": {
                    "auto_corrections": self.edits
                },
                "audit_logs": self.logs
            }
        }
        self.log("COMPLETE", f"Audit Finished. Verdict: {verdict}")
        return output

# ==============================================================================
# 4. EXECUTION ENTRANCE
# ==============================================================================

if __name__ == "__main__":
    
    # Default mock input (Fallback)
    input_data = {
        "title": "Why the sky is blue and other amazing facts about the universe that will blow your mind completely",
        "content_body": "The sky is blue because of Rayleigh scattering. This is a fact. Some people say the earth is flat (fake)."
    }

    # Try reading from STDIN
    try:
        raw_input = sys.stdin.read()
        if raw_input.strip():
            # If input is CalliopeOutput, extraction logic might be needed
            # For now, we assume the input IS the script content or contains it
            parsed = json.loads(raw_input)
            
            # ADAPTER: Extract script_content from CalliopeOutput if present
            if "script_content" in parsed:
                 input_data = {
                     "title": parsed.get("metadata", {}).get("title", ""),
                     "content_body": parsed.get("script_content", {}).get("full_markdown", "")
                 }
            else:
                 input_data = parsed
    except Exception as e:
        pass # Fallback to mock

    agent = ArgusAgent()
    result = agent.run_audit(input_data)
    print(json.dumps(result, indent=2))
