Œ
import json

try:
    with open(r"c:\Users\daria\payload.json", "r") as f:
        payload = f.read()

    data = json.loads(payload)
    # unpack inner list [ [nb1, nb2...] ]
    notebooks = data[0]
    
    nb1 = notebooks[0]
    print(f"Notebook 1 Length: {len(nb1)}")
    
    for i, field in enumerate(nb1):
        if isinstance(field, list):
            print(f"Index {i}: [List length {len(field)}]")
            # print snippet
            snippet = str(field)[:50]
            print(f"   Snippet: {snippet}...")
        else:
            print(f"Index {i}: {field}")

except Exception as e:
    print(f"Error: {e}")
Œ*cascade082)file:///c:/Users/daria/analyze_payload.py