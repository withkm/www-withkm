import {NavigationLink} from "@/interfaces/core.interfaces";

const navLinks: NavigationLink[] = [
    {
        label: "Home",
        url: "#home",
    },
    {
        label: "Services",
        url: "#services",
    },
    {
        label: "Our Story",
        url: "#our-story",
    },
    {
        label: "Contact Us",
        url: "#contact-us",
    },
]

const socialMediaLinks: NavigationLink[] = [
    {
        label: "Facebook",
        url: "https://web.facebook.com/profile.php?id=61574146843277",
    },
    {
        label: "Instagram",
        url: "https://www.instagram.com/officialwithkm/",
    },
    {
        label: "Tiktok",
        url: "tiktok.com/@withkm",
    },
    {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/withkm/",
    },
]

const otherLinks: NavigationLink[] = [
    {
        label: "Learn WithKM",
        url: "https://learn.withkm.com/",
    }
]

const policyLinks: NavigationLink[] = [
    {
        label: "Privacy Policy",
        url: "/privacy-policy",
    },
    {
        label: "Terms of Service",
        url: "/terms-of-service",
    },
]

export {
    navLinks,
    socialMediaLinks,
    otherLinks,
    policyLinks
};