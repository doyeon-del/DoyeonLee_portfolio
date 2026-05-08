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
    id: "ssafy-ai-challenge-2026",
    title: "SSAFY 2nd AI Challenge: Recyclables VQA",
    subtitle: "Qwen2.5-VL-7B 모델 최적화 및 앙상블 전략 수립",
    period: "2026.04",
    tags: ["VQA", "Qwen2.5-VL", "Fine-tuning", "Batch Inference"],
    description:
      "분리수거 이미지 질의응답 시스템 구축을 위해 멀티모달 모델을 파인튜닝하고 추론 파이프라인을 최적화했습니다.",
    highlights: [
      "Qwen2.5-VL-7B LoRA 파인튜닝 및 레이블 마스킹(Assistant 답변 한정) 적용",
      "Batch Inference 도입 및 padding-side 최적화로 추론 속도 10배 개선",
      "3개 Seed(42, 123, 2024) 기반 Majority Vote 앙상블로 예측 안정성 확보"
    ],
    links: [
      { label: "Solution Code", href: "#" }, // 여기에 파일 경로나 링크를 넣으세요.
    ],
  },
  {
    id: "dacon-support-2025",
    title: "Dacon Basic: 고객 지원 등급 분류",
    subtitle: "LightGBM·CatBoost 앙상블, Optuna 튜닝, SHAP 인사이트",
    period: "2025",
    tags: ["Machine Learning", "Classification", "Ensemble", "Optuna", "SHAP"],
    description:
      "고객 특성 데이터 기반으로 지원 필요도(0/1/2) 분류. 데이터 전처리 → 모델 비교(LGBM/Cat/XGB) → 보팅 앙상블 → SHAP.",
    highlights: [
      "Macro F1(CV) 개선 (Baseline 대비)",
      "결제 지연일·계약기간·최근 이용 간격이 주요 요인",
    ],
    links: [
      { label: "GitHub Repo", href: "https://github.com/doyeon-del/dacon-customer-support" },
    ],
  },
  // ... 기존 다른 프로젝트들
];

const TAGS = ["All", ...Array.from(new Set(PROJECTS.flatMap(p => p.tags)))];

function ProjectCard({ p }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: "24px", // 토스 스타일의 둥근 모서리
        border: "1px solid #F2F4F6",
        backgroundColor: "#FFFFFF",
        transition: "all 0.3s ease",
        ":hover": { transform: "translateY(-4px)", boxShadow: "0 12px 30px rgba(0,0,0,0.04)" },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="h6" fontWeight={800} sx={{ color: "#191F28" }}>
            {p.title}
          </Typography>
          <Chip label={p.period} size="small" sx={{ fontWeight: 600, backgroundColor: "#F2F4F6", color: "#6B7684" }} />
        </Box>

        <Typography variant="body2" sx={{ color: "#3182F6", fontWeight: 600, mb: 2 }}>
          {p.subtitle}
        </Typography>

        <Typography variant="body2" sx={{ color: "#4E5968", lineHeight: 1.6, mb: 3 }}>
          {p.description}
        </Typography>

        {p.highlights?.length > 0 && (
          <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none", mb: 3 }}>
            {p.highlights.map((h, i) => (
              <Box component="li" key={i} sx={{ display: "flex", gap: 1, mb: 1 }}>
                <Typography variant="body2" sx={{ color: "#3182F6", fontWeight: "bold" }}>•</Typography>
                <Typography variant="body2" sx={{ color: "#4E5968" }}>{h}</Typography>
              </Box>
            ))}
          </Box>
        )}

        <Stack direction="row" spacing={0.5} flexWrap="wrap" mb={4}>
          {p.tags.map(t => (
            <Chip key={t} label={t} size="small" sx={{ fontSize: "11px", borderRadius: "4px" }} />
          ))}
        </Stack>

        <Stack direction="row" spacing={1}>
          {p.links?.map(l => (
            <Button
              key={l.href}
              href={l.href}
              target="_blank"
              size="small"
              sx={{ textTransform: "none", fontWeight: 700, color: "#3182F6" }}
              endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
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
    <Box component="section" id="projects" sx={{ py: 10, backgroundColor: "#F9FAFB" }}>
      <Container maxWidth="lg">
        <Box mb={6}>
          <Typography variant="h3" fontWeight={800} sx={{ color: "#191F28", mb: 2 }}>
            Projects
          </Typography>
          <Typography variant="body1" sx={{ color: "#4E5968" }}>
            데이터 아키텍처와 최신 AI 기술을 결합하여 실질적인 해결책을 도출한 기록입니다.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 5 }}>
          {TAGS.map(tag => (
            <Button
              key={tag}
              disableElevation
              variant={active === tag ? "contained" : "text"}
              onClick={() => setActive(tag)}
              sx={{
                borderRadius: "999px",
                textTransform: "none",
                px: 2,
                backgroundColor: active === tag ? "#3182F6" : "transparent",
                color: active === tag ? "#FFFFFF" : "#6B7684",
                ":hover": { backgroundColor: active === tag ? "#1B64DA" : "#F2F4F6" }
              }}
            >
              {tag}
            </Button>
          ))}
        </Stack>

        <Grid container spacing={4}>
          {filtered.map(p => (
            <Grid item xs={12} md={6} key={p.id}>
              <ProjectCard p={p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}