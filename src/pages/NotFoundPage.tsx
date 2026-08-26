import { Link } from "@/lib/link";

export function NotFoundPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-surface-background px-page text-center">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-primary">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-content-primary">
        Página não encontrada
      </h1>
      <p className="mt-3 max-w-sm text-sm text-content-secondary">
        O endereço que você abriu não existe ou foi movido.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-medium text-content-inverse"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
