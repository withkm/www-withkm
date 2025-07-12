import {InfoCard, ProcessInfoCard, TextBlock} from "@/interfaces/core.interfaces";
import {
    HeadCircuitIcon,
    ArrowClockwiseIcon,
    BugBeetleIcon,
    CodeIcon,
    LightbulbFilamentIcon,
    MagicWandIcon,
    RocketLaunchIcon,
    ListChecksIcon, BugIcon, DeviceMobileIcon
} from "@phosphor-icons/react/ssr";

const servicesContent: InfoCard[] = [
    {
        title: "Web Development",
        description: "We build secure, scalable web systems tailored to your product goals.",
        icon: CodeIcon
    },
    {
        title: "Mobile App Development",
        description: "We develop cross-platform apps with React Native that feel fast and fluid.",
        icon: DeviceMobileIcon
    },
    {
        title: "UI/UX Design",
        description: "We build secure, scalable web systems tailored to your product goals.",
        icon: MagicWandIcon
    },
    {
        title: "QA Testing",
        description: "We ensure every release is reliable, bug-free, and production-ready.",
        icon: BugIcon
    },
    {
        title: "AI & Automation Development",
        description: "We create smart tools and workflows that streamline processes and save time.",
        icon: HeadCircuitIcon
    },
    {
        title: "Project Management",
        description: "We manage timelines, communication, and progress so you can stay focused.",
        icon: ListChecksIcon
    },
]

const processesContent: ProcessInfoCard[] = [
    {
        title: "Understand the vision",
        description: "We gather insights, align goals, and define what success looks like.",
        iconText: "Discover",
        icon: LightbulbFilamentIcon
    },
    {
        title: "Share the experience",
        description: "Wireframes, mockups, and prototypes to bring your ideas to life.",
        iconText: "Design",
        icon: MagicWandIcon
    },
    {
        title: "Build in sprints",
        description: "We ship working features in short cycles, adapting quickly to feedback.",
        iconText: "Develop",
        icon: CodeIcon
    },
    {
        title: "Ensure Quality",
        description: "We test continuously — catching bugs and refining usability.",
        iconText: "Test",
        icon: BugBeetleIcon
    },
    {
        title: "Confidently Launch",
        description: "We handle deployment and support so you're ready for the real world.",
        iconText: "Launch",
        icon: RocketLaunchIcon
    },
    {
        title: "Improve continuously",
        description: "We gather feedback and update fast to keep your product growing.",
        iconText: "Iterate",
        icon: ArrowClockwiseIcon
    }
]

const heroCardContent: TextBlock[] = [
    {
        title: "Build Around Your Vision",
        description: "We craft custom software that brings your exact ideas to life — no templates, no compromises."
    },
    {
        title: "Ready for Real-World Use",
        description: "From MVPs to full systems, our software is built to perform, adapt, and last."
    },
    {
        title: "Clear, Collaborative Process",
        description: "We work closely with you at every step, keeping communication clear and development worry-free."
    }
]


export {
    servicesContent,
    processesContent,
    heroCardContent
}