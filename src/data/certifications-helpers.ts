import { certifications } from "./certifications";
import { Certification } from "./types";

export function getAllCertifications(): Certification[] {
  return certifications;
}

export function getCertificationById(id: string): Certification | undefined {
  return certifications.find((c) => c.id === id);
}

export function getAdjacentCertification(
  currentId: string
): { prev: Certification; next: Certification } | undefined {
  const index = certifications.findIndex((c) => c.id === currentId);
  if (index === -1) return undefined;
  const total = certifications.length;
  return {
    prev: certifications[(index - 1 + total) % total],
    next: certifications[(index + 1) % total],
  };
}
