# Despliegue: Vercel, cPanel, dominio y SMTP

## Arquitectura recomendada

```text
GitHub (fuente)
   └── Vercel (Next.js + API de contacto)
         ├── dominio / DNS administrado en cPanel
         └── SMTP del dominio administrado en cPanel
```

Esta separación aprovecha la integración completa de Next.js en Vercel y conserva correo, dominio y operación en cPanel.

## 1. Vercel

1. Importar el repositorio de GitHub.
2. Framework preset: Next.js.
3. Build command: `npm run build`.
4. Añadir variables de `.env.example` en Project Settings → Environment Variables.
5. Desplegar primero a Preview.
6. Validar formulario, metadata, imágenes y redirects.
7. Asociar el dominio cuando la clienta apruebe.

Variables públicas y privadas deben configurarse por separado. Nunca copiar `.env.local` al repositorio.

## 2. cPanel con Node.js Application

Si el plan de hosting incluye **Setup Node.js App**:

1. Node.js 22 o superior.
2. Application root fuera de `public_html` cuando el proveedor lo permita.
3. Subir repo o conectar Git Version Control.
4. Ejecutar `npm ci` y `npm run build`.
5. Comando de inicio: `npm run start -- --hostname 0.0.0.0`.
6. Definir variables de entorno desde la interfaz de cPanel.
7. Reiniciar aplicación.
8. Activar proxy del dominio desde la herramienta Node del hosting.

Si el plan no soporta aplicaciones Node persistentes, no subir `.next` como si fuera PHP. Mantener frontend/API en Vercel o solicitar un plan con Node.

## 3. Variante estática para cPanel

Next.js puede exportar HTML estático, pero el endpoint `/api/contact` y cualquier futura función de servidor no están disponibles en ese modo. Si el acceso de hosting confirma que solo existe Apache/PHP, crear una rama de despliegue estático y un endpoint PHP separado para SMTP. Esta decisión se hará con datos reales del hosting, no antes.

## 4. DNS

Para Vercel:

- Agregar el dominio al proyecto Vercel.
- Copiar exactamente los registros indicados por Vercel.
- Editarlos en Zone Editor de cPanel.
- No eliminar MX, SPF, DKIM o DMARC del correo.
- Esperar propagación y verificar HTTPS antes de redirigir tráfico.

## 5. SMTP

Configurar una cuenta específica, por ejemplo `web@dominio.com`, con:

```env
SMTP_HOST=mail.dominio.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=web@dominio.com
SMTP_PASSWORD=...
SMTP_FROM="GÜATSART <web@dominio.com>"
CONTACT_TO=destino@dominio.com
```

Para puerto 587 usar `SMTP_SECURE=false` y STARTTLS. Confirmar parámetros con el proveedor.

### Entregabilidad

- SPF autoriza al servidor remitente.
- DKIM habilitado y validado.
- DMARC comienza en `p=none` durante observación y se endurece después.
- `replyTo` corresponde al visitante; `from` siempre pertenece al dominio.
- Probar recepción en Gmail, Outlook y el buzón corporativo.

## 6. Seguridad

- Zod valida y limita el payload.
- Honeypot bloquea automatizaciones básicas.
- Rate limit en memoria protege el prototipo; producción con tráfico debe migrar a un store compartido.
- No registrar el cuerpo de mensajes ni credenciales.
- Añadir aviso de privacidad antes de producción.
- Configurar monitoreo de errores sin capturar contenido del formulario.

## 7. Checklist de lanzamiento

- [ ] Copy, biografía y fichas aprobadas.
- [ ] Correo, teléfono, Instagram y ubicación confirmados.
- [ ] Dominio y HTTPS activos.
- [ ] SMTP probado de extremo a extremo.
- [ ] Política de privacidad publicada.
- [ ] Open Graph validado.
- [ ] `npm run verify` en limpio.
- [ ] Capturas revisadas en móvil, tablet y escritorio.
- [ ] Backup del sitio y exportación de DNS.
- [ ] Rollback probado desde un deployment anterior de Vercel.

## 8. Fuente técnica

Next.js admite servidor Node.js, Docker, exportación estática y adaptadores de plataforma. El servidor Node conserva todas las capacidades; la exportación estática limita funciones de servidor. Ver documentación oficial: `https://nextjs.org/docs/app/getting-started/deploying`.
