import {ReactNode} from "react";

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
    icon: React.ComponentType<{ className?: string }>;
}

interface ProcessInfoCard extends InfoCard {
    iconText: string;
}

interface TextBlock {
    title: string;
    description: ReactNode;
}

interface ContactFormData {
    from_name: string;
    from_email: string;
    subject: string;
    message: string;
}


export type {
    NavigationLink,
    SocialMediaLink,
    InfoCard,
    ProcessInfoCard,
    TextBlock,
    Branding,
    ContactFormData
};




