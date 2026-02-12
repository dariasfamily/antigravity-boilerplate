
import os
import json
import time
import datetime
import re

# PATHS
BRAIN_DIR = r"C:\Users\daria\.gemini\AXON\brain\e6fc57ba-9b26-455d-bcf0-142947e7b879"
DNA_PATH = os.path.join(BRAIN_DIR, "BRAND_DNA.md")

# MOCK ORACLE (Rube/Perplexity interaction)
def consult_oracle(query, context):
    """
    Simulated Rube/Perplexity Search.
    In real implementation, uses: run_composio_tool('PERPLEXITY_SEARCH', ...)
    """
    print(f"  > [ORACLE] Searching: '{query}' with context bias...")
    return [
        {"topic": "Autonomous Coding Agents", "score": 98, "resource": "arxiv.org/2304.01", "relevance": "High"},
        {"topic": "Cursor vs VScode", "score": 92, "resource": "reddit.com/r/coding", "relevance": "High"},
        {"topic": "BlueSky Growth", "score": 85, "resource": "techcrunch.com", "relevance": "Medium"}
    ]

def read_brand_dna():
    """Reads and parses the Golden Record."""
    if not os.path.exists(DNA_PATH):
        return {"tone": "Generic", "pillars": []}
    
    content = open(DNA_PATH, "r", encoding="utf-8").read()
    
    # Simple regex extraction
    tone_match = re.search(r"\*\*Tone of Voice\*\*:(.*?)\n\n", content, re.DOTALL)
    pillars_match = re.findall(r"### Pillar \w+: (.*?)\n", content)
    
    return {
        "text": content[:500], # Keep concise for prompt
        "tone": tone_match.group(1).strip() if tone_match else "Standard provided",
        "pillars": pillars_match
    }

def read_dynamic_brain():
    """
    Reads the 'Writers Room' (Google Doc).
    Mocked for MVP.
    """
    return "User Note: Focus on 'Wealth Engineering' this week. I like the idea of 'Factories'."

def main():
    print(f"\n[ORION] ðŸŒŒ Nightly Protocol Initiated: {datetime.datetime.now()}")
    
    # 1. INGEST CONTEXT (Static + Dynamic)
    print("[ORION] Ingesting Context...")
    dna = read_brand_dna()
    dynamic_notes = read_dynamic_brain()
    
    print(f"  > [DNA] Loaded. Pillars: {dna['pillars']}")
    print(f"  > [DYNAMIC] User Intent: '{dynamic_notes}'")
    
    # 2. SYNTHESIZE QUERY
    # Logic: Combine Pillars + User Note -> Search Query
    active_focus = dna['pillars'][1] if len(dna['pillars']) > 1 else "General"
    query = f"Latest trends in {active_focus} and {dynamic_notes}"
    
    # 3. INVESTIGATE (Research)
    print(f"[ORION] Engaging Oracle...")
    trends = consult_oracle(query, dna['tone'])
    
    # 4. PROPOSE (Drafting the Brief)
    proposal = f"""
# ðŸ“‹ ORION BRIEFING [{datetime.date.today() + datetime.timedelta(days=1)}]
**Directives**: Equalize '{active_focus}' with '{dynamic_notes}'.
**Voice Check**: {dna['tone'][:50]}...

## PROPOSED TOPICS
1. **{trends[0]['topic']}** (Viral Score: {trends[0]['score']})
   - *Hook*: "Stop coding features. Start building factories."
   - *Source*: {trends[0]['resource']}
   - *Alignment*: Matches Pillar B (Wealth).

2. **{trends[1]['topic']}** (Viral Score: {trends[1]['score']})
   - *Hook*: "Why your IDE is costing you money."
   - *Source*: {trends[1]['resource']}

## NEXT ACTIONS
- [ ] Approve Topic 1 -> Triggers Calliope
- [ ] Approve Topic 2 -> Triggers Calliope
"""
    
    # 5. LOG & NOTIFY
    print("[ORION] Uploading to Writers_Room_LOG...")
    time.sleep(1)
    print(f"[ORION] Briefing Ready. Pending Commander Approval.")
    # In real system: send_notification_to_dashboard(proposal)
    
    return json.dumps({
        "status": "success",
        "action": "nightly_brief",
        "brief_preview": proposal[:100] + "..."
    })

if __name__ == "__main__":
    main()
