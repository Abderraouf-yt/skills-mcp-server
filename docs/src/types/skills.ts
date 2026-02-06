// Skills data types
export interface Skill {
    id: string;
    path: string;
    category: string;
    name: string;
    description: string;
    risk: string;
    source: string;
}

// Skills data is a flat array
export type SkillsData = Skill[];
