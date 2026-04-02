"""Script simples para verificar se os notebooks abrem sem erro."""
import json
from pathlib import Path

notebooks = list(Path(".").rglob("*.ipynb"))
print(f"🔍 Encontrados {len(notebooks)} notebooks\n")

errors = []
for nb in notebooks:
    try:
        with open(nb, "r", encoding="utf-8") as f:
            json.load(f)
        print(f"✅ {nb}")
    except Exception as e:
        errors.append((nb, str(e)))
        print(f"❌ {nb} - ERRO")

if errors:
    print("\n⚠️ Problemas encontrados:")
    for nb, err in errors:
        print(f"  - {nb}: {err}")
else:
    print("\n🎉 Todos os notebooks estão válidos!")
