import type { Property, Holding, Developer } from './types';

interface RecommendationResult {
  property: Property;
  score: number;
  reason: string;
}

export function getRecommendations(
  allProperties: Property[],
  holdings: Holding[],
  followedDeveloperIds: string[],
): RecommendationResult[] {
  // Properties the investor already owns
  const ownedPropertyIds = new Set(holdings.map((h) => h.property.id));

  // Types the investor prefers (based on holdings)
  const preferredTypes = new Set(holdings.map((h) => h.property.type));

  // Locations the investor invests in
  const preferredLocations = new Set(holdings.map((h) => h.property.location.area));

  // Score each property
  const scored: RecommendationResult[] = allProperties
    .filter((p) => !ownedPropertyIds.has(p.id) && p.status === 'active')
    .map((property) => {
      let score = 0;
      const reasons: string[] = [];

      // +3 same type as existing holdings
      if (preferredTypes.has(property.type)) {
        score += 3;
        reasons.push('Similar to your investments');
      }

      // +5 followed developer
      if (followedDeveloperIds.includes(property.developer.id)) {
        score += 5;
        reasons.push('From a developer you follow');
      }

      // +2 >80% funded (urgency/FOMO)
      const fundedPercent = property.unitsSold / property.totalUnits;
      if (fundedPercent > 0.8) {
        score += 2;
        reasons.push('Almost fully funded');
      }

      // +1 same location
      if (preferredLocations.has(property.location.area)) {
        score += 1;
        reasons.push('In an area you invest in');
      }

      // +1 base score for active properties with investors
      if (property.investorCount > 100) {
        score += 1;
        reasons.push('Popular with investors');
      }

      return {
        property,
        score,
        reason: reasons[0] || 'Recommended for you',
      };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 5);
}

export function getSimilarProperties(
  currentProperty: Property,
  allProperties: Property[],
): Property[] {
  return allProperties
    .filter((p) => p.id !== currentProperty.id && p.status === 'active')
    .map((p) => {
      let score = 0;
      if (p.type === currentProperty.type) score += 3;
      if (p.developer.id === currentProperty.developer.id) score += 2;
      if (p.location.area === currentProperty.location.area) score += 1;
      if (p.location.state === currentProperty.location.state) score += 0.5;
      return { property: p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.property);
}
