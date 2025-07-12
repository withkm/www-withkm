import {ElementType, ReactNode} from "react";

interface Branding{
    address: string;
    email: string;
    phone: string;
    tagline: string;
}

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
    description: ReactNode;
}


export type {
    NavigationLink,
    SocialMediaLink,
    InfoCard,
    ProcessInfoCard,
    TextBlock,
    Branding
};




