"""
NotebookLM Cookie Setup - Método Manual Guiado

Este script te guía paso a paso para copiar las cookies desde Chrome.
NO requiere cerrar Chrome ni instalar extensiones.
"""
import json
from pathlib import Path

STORAGE_PATH = Path.home() / ".notebooklm" / "storage_state.json"

def main():
    print("=" * 70)
    print("🍪 Configuración de Cookies de NotebookLM - Método Manual")
    print("=" * 70)
    print()
    print("Sigue estos pasos EN CHROME:")
    print()
    print("1️⃣  Abre https://notebooklm.google.com/ (asegúrate de estar logueado)")
    print("2️⃣  Presiona F12 para abrir DevTools")
    print("3️⃣  Ve a la pestaña 'Console' (Consola)")
    print("4️⃣  Copia y pega este código JavaScript:")
    print()
    print("-" * 70)
    print("""
(async () => {
    const cookies = await cookieStore.getAll();
    const formatted = {
        cookies: cookies.map(c => ({
            name: c.name,
            value: c.value,
            domain: c.domain,
            path: c.path,
            expires: c.expires,
            httpOnly: c.httpOnly || false,
            secure: c.secure || false,
            sameSite: c.sameSite || "Lax"
        }))
    };
    copy(JSON.stringify(formatted, null, 2));
    console.log("✅ Cookies copiadas al portapapeles!");
})();
""")
    print("-" * 70)
    print()
    print("5️⃣  Presiona ENTER y verás '✅ Cookies copiadas al portapapeles!'")
    print("6️⃣  Las cookies ya están en tu portapapeles (Ctrl+V para pegar)")
    print()
    print("=" * 70)
    print()
    
    input("Presiona ENTER cuando hayas copiado las cookies...")
    print()
    print("Ahora pega las cookies aquí (Ctrl+V y presiona ENTER dos veces):")
    print()
    
    # Leer el JSON pegado por el usuario
    lines = []
    print("(Pega el JSON y presiona ENTER dos veces cuando termines)")
    print()
    
    while True:
        try:
            line = input()
            if line.strip() == "" and lines:
                break
            lines.append(line)
        except EOFError:
            break
    
    json_str = "\n".join(lines)
    
    try:
        # Validar y guardar
        cookies_data = json.loads(json_str)
        
        # Asegurar que tiene la estructura correcta
        if "cookies" not in cookies_data:
            print("❌ Error: El JSON debe tener una clave 'cookies'")
            return False
        
        # Crear directorio si no existe
        STORAGE_PATH.parent.mkdir(parents=True, exist_ok=True)
        
        # Guardar
        with open(STORAGE_PATH, 'w', encoding='utf-8') as f:
            json.dump(cookies_data, f, indent=2)
        
        print()
        print("=" * 70)
        print(f"✅ Cookies guardadas en: {STORAGE_PATH}")
        print("=" * 70)
        print()
        print("🎉 ¡Configuración completa!")
        print()
        print("Ahora ejecuta: python scripts/sync_notebooklm.py")
        print()
        
        return True
        
    except json.JSONDecodeError as e:
        print(f"\n❌ Error al parsear JSON: {e}")
        print("Asegúrate de pegar el JSON completo.")
        return False
    except Exception as e:
        print(f"\n❌ Error: {e}")
        return False

if __name__ == "__main__":
    main()
