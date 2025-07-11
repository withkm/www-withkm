import {ElementType} from "react";

interface NavigationLink {
    label: string;
    url: string;
}
type SocialMediaLink = NavigationLink

interface InfoCard {
    title: string;
    description: string;
    icon: ElementType;
}

interface ProcessInfoCard extends InfoCard {
    iconText: string;
}

interface TextBlock {
    title: string;
    description: string;
}


export type {
    NavigationLink,
    SocialMediaLink,
    InfoCard,
    ProcessInfoCard,
    TextBlock,
};




