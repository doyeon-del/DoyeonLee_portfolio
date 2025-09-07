import React, { useMemo, useState } from "react";

// Drop this file into your src/ folder (e.g., src/Projects.jsx)
// Then route to it (e.g., in App.jsx) <Projects />
// TailwindCSS recommended but not required; uses utility classes if available.

const PROJECTS = [
  {
    id: "dacon-support-2025",
    title: "Dacon Basic: 고객 지원 등급 분류",
    subtitle: "LightGBM·CatBoost 앙상블, Optuna 튜닝, SHAP 인사이트",
    period: "2025",
    tags: ["Machine Learning", "Classification", "Ensemble", "Optuna", "SHAP"],
    description:
      "고객 특성 데이터 기반으로 지원 필요도(0/1/2) 분류. 데이터 전처리 → 모델 비교(LGBM/Cat/XGB) → 보팅 앙상블 → SHAP.",
    highlights: [
      "Macro F1(CV) 개선 +X.XXp (Baseline 대비)",
      "결제 지연일·계약기간·최근 이용 간격이 주요 요인",
    ],
    links: [
      { label: "GitHub Repo", href: "https://github.com/USERNAME/dacon-customer-support" },
      { label: "Submission.csv", href: "https://github.com/USERNAME/dacon-customer-support/releases" },
      { label: "데이콘 대회 페이지", href: "https://dacon.io" },
    ],
  },
  {
    id: "lg-aimers-forecast",
    title: "LG Aimers: 리조트 메뉴 수요 예측",
    subtitle: "LightGBM 시계열, SMAPE 최적화",
    period: "2024",
    tags: ["Time Series", "LightGBM", "SMAPE"],
    description:
      "28일 입력 → 7일 예측. 시차·요일·프로모션 피처링과 캘린더리스 효과 반영.",
    highlights: ["SMAPE 상위권", "피처 중요도 해석·대시보드"],
    links: [
      { label: "GitHub Repo", href: "https://github.com/USERNAME/lg-aimers-forecast" },
    ],
  },
  {
    id: "finance-credit-risk",
    title: "Finance Credit Risk Analytics",
    subtitle: "Binary/Multiclass, LightGBM + SHAP",
    period: "2024",
    tags: ["Credit Risk", "LightGBM", "Explainable AI"],
    description:
      "거래·고객 특성 기반 부도 위험 분류, 파생변수 설계 및 검증.",
    highlights: ["ROC-AUC ↑", "리스크 요인 해석"],
    links: [
      { label: "GitHub Repo", href: "https://github.com/USERNAME/finance_credit_risk_analytics" },
    ],
  },
];

const TAGS = ["All", ...Array.from(new Set(PROJECTS.flatMap(p => p.tags)))];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs leading-5 mr-1 mb-1">
      {children}
    </span>
  );
}

function LinkButton({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center rounded-2xl border px-3 py-1 text-sm hover:shadow-md transition"
    >
      {children}
    </a>
  );
}

function ProjectCard({ p }) {
  return (
    <div className="rounded-2xl border p-5 hover:shadow-lg transition h-full flex flex-col">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">{p.title}</h3>
        <span className="text-xs opacity-70">{p.period}</span>
      </div>
      <p className="mt-1 text-sm opacity-80">{p.subtitle}</p>
      <div className="mt-3 flex flex-wrap">
        {p.tags.map(t => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
      <p className="mt-3 text-sm">{p.description}</p>
      {p.highlights?.length > 0 && (
        <ul className="mt-3 list-disc list-inside text-sm space-y-1">
          {p.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex gap-2 flex-wrap">
        {p.links?.map(l => (
          <LinkButton key={l.href} href={l.href}>
            {l.label}
          </LinkButton>
        ))}
      </div>
      <div className="mt-auto" />
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState("All");
  const filtered = useMemo(() => {
    if (active === "All") return PROJECTS;
    return PROJECTS.filter(p => p.tags.includes(active));
  }, [active]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="opacity-80 mt-1 text-sm">
          데이터 기반 문제정의 → 모델링/분석 → 해석/결과물까지의 완결형 프로젝트 모음.
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`rounded-2xl border px-3 py-1 text-sm hover:shadow-sm transition ${
              active === tag ? "bg-black text-white" : ""
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <ProjectCard key={p.id} p={p} />)
        )}
      </div>

      {/* How to use note */}
      <section className="mt-10 rounded-xl border p-4 text-sm">
        <h2 className="font-semibold mb-1">How to maintain</h2>
        <ol className="list-decimal list-inside space-y-1 opacity-90">
          <li>USERNAME을 본인 GitHub 아이디로 바꾸세요.</li>
          <li>새 프로젝트를 추가할 때는 PROJECTS 배열에 객체를 하나 더 추가하세요.</li>
          <li>필요하면 태그를 추가하면 자동으로 필터 버튼이 생깁니다.</li>
          <li>라우팅: App.jsx에서 <code>{`<Projects />`}</code>를 연결하세요.</li>
        </ol>
      </section>
    </div>
  );
}
