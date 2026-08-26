import pathlib
import re

ROOT = pathlib.Path(".")
SKIP = {"node_modules", ".git", "dist", ".next"}

REPLACEMENTS = [
    ('import Link from "next/link";\n', 'import { Link } from "@/lib/link";\n'),
    ('import { usePathname } from "next/navigation";\n', 'import { usePathname } from "@/hooks/usePathname";\n'),
    ('import { useRouter } from "next/navigation";\n', 'import { useRouter } from "@/hooks/useRouter";\n'),
    (
        'import { useParams, useRouter } from "next/navigation";\n',
        'import { useParams } from "react-router-dom";\nimport { useRouter } from "@/hooks/useRouter";\n',
    ),
    ('import { useParams } from "next/navigation";\n', 'import { useParams } from "react-router-dom";\n'),
]

changed = []

for path in ROOT.rglob("*"):
    if any(part in SKIP for part in path.parts):
        continue
    if path.suffix not in {".ts", ".tsx"}:
        continue
    text = path.read_text(encoding="utf-8")
    original = text
    text = re.sub(r'^"use client";\r?\n\r?\n', "", text)
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)
    text = re.sub(r"^export default function ", "export function ", text, count=1, flags=re.M)
    if text != original:
        path.write_text(text, encoding="utf-8")
        changed.append(str(path))

print(f"updated {len(changed)} files")
for name in changed:
    print(name)
