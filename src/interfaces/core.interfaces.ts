import {ReactNode} from "react";

interface NavigationLink {
    label: string;
    url: string;
}
type SocialMediaLink = NavigationLink

interface InfoCard {
    title: string;
    description: string;
    icon: ReactNode;
}

interface TextBlock {
    title: string;
    description: string;
}


export type {
    NavigationLink,
    SocialMediaLink,
    InfoCard,
    TextBlock,
};




