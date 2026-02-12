"""
Wrapper para ejecutar el login de notebooklm-py

Este script llama directamente a la función de login del CLI.
"""
import sys
from pathlib import Path

# Importar la función de login del CLI
try:
    from notebooklm.cli.session import register_session_commands
    import click
    
    print("=" * 70)
    print("🔐 NotebookLM Login - Método Oficial")
    print("=" * 70)
    print()
    print("Este proceso abrirá un navegador Chromium para que te loguees.")
    print("Después de loguearte, presiona ENTER en la terminal.")
    print()
    print("IMPORTANTE: Si el navegador no se abre o hay errores,")
    print("es porque Playwright no está instalado correctamente.")
    print()
    
    # Crear un grupo CLI temporal
    @click.group()
    def cli():
        pass
    
    # Registrar los comandos de sesión
    register_session_commands(cli)
    
    # Ejecutar el comando login
    sys.argv = ['notebooklm', 'login']
    cli()
    
except ImportError as e:
    print(f"❌ Error al importar módulos: {e}")
    print()
    print("Solución: Reinstala notebooklm-py con:")
    print("  pip install --upgrade notebooklm-py")
except Exception as e:
    print(f"❌ Error: {e}")
    print()
    print("Si ves un error de Playwright, ejecuta:")
    print("  playwright install chromium")
