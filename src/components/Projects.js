import React, { useMemo, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Chip,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Divider,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

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
      { label: "GitHub Repo", href: "https://github.com/doyeon-del/dacon-customer-support" },
      { label: "Submission.csv", href: "https://github.com/doyeon-del/dacon-customer-support/releases" },
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
      { label: "GitHub Repo", href: "https://github.com/doyeon-del/lg-aimers-forecast" },
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
      { label: "GitHub Repo", href: "https://github.com/Udoyeon-del/finance_credit_risk_analytics" },
    ],
  },
];

const TAGS = ["All", ...Array.from(new Set(PROJECTS.flatMap(p => p.tags)))];

function ProjectCard({ p }) {
  return (
      <Card
      sx={{
      height: "100%",
      ":hover": { transform: "translateY(-2px)", boxShadow: 6 },
      }}
      >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6" fontWeight={700}>
            {p.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {p.period}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {p.subtitle}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1.5 }}>
          {p.tags.map(t => (
            <Chip key={t} label={t} size="small" variant="outlined" />
          ))}
        </Stack>

        <Typography variant="body2" sx={{ mt: 1.5 }}>
          {p.description}
        </Typography>

        {p.highlights?.length > 0 && (
          <Box component="ul" sx={{ mt: 1.5, pl: 2, mb: 0 }}>
            {p.highlights.map((h, i) => (
              <Typography component="li" key={i} variant="body2">
                {h}
              </Typography>
            ))}
          </Box>
        )}

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 2 }}>
          {p.links?.map(l => (
            <Button
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              size="small"
              variant="outlined"
              endIcon={<OpenInNewIcon fontSize="small" />}
            >
              {l.label}
            </Button>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function Projects() {
  const [active, setActive] = useState("All");
  const filtered = useMemo(() => {
    if (active === "All") return PROJECTS;
    return PROJECTS.filter(p => p.tags.includes(active));
  }, [active]);

  return (
    <Box component="section" id="projects" sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Box mb={2}>
          <Typography variant="h4" fontWeight={800}>
            Projects
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            데이터 기반 문제정의 → 모델링/분석 → 해석/결과물까지의 완결형 프로젝트 모음.
          </Typography>
        </Box>

        {/* Filters */}
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
          {TAGS.map(tag => {
            const selected = active === tag;
            return (
              <Button
                key={tag}
                size="small"
                variant={selected ? "contained" : "outlined"}
                onClick={() => setActive(tag)}
                sx={{ textTransform: "none", borderRadius: 999 }}
              >
                {tag}
              </Button>
            );
          })}
        </Stack>

        <Grid container spacing={2.5}>
          {filtered.map(p => (
            <Grid item xs={12} sm={6} lg={4} key={p.id}>
              <ProjectCard p={p} />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            How to maintain
          </Typography>
          <Box component="ol" sx={{ pl: 2, m: 0 }}>
            <Typography component="li" variant="body2" color="text.secondary">
             ????????
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              새 프로젝트를 추가할 때는 PROJECTS 배열에 객체를 하나 더 추가하세요.
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              태그를 추가하면 필터 버튼이 자동으로 생깁니다.
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              App.js에서 {"<Projects />"}로 연결되어 있으면 그대로 동작합니다.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
