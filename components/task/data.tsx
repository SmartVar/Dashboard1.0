import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const labels = [
  {
    value: "report",
    label: "Report",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "frac",
    label: "FRAC",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "proposal",
    label: "Proposal",
    icon: QuestionMarkCircledIcon,
  },
    {

value: "funds",
        label: "Funds",
        icon: QuestionMarkCircledIcon,
    } ,  
    {
    value: "rti",
        label: "RTI",
        icon: QuestionMarkCircledIcon,
      },
    {
    value: "other",
        label: "Other",
        icon: QuestionMarkCircledIcon,
      }

]

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "To do",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]

