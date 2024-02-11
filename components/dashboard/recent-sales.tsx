import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>C.O</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Vacant Plots</p>
          <p className="text-sm text-muted-foreground">
            To utilise vacant spaces and plots area
          </p>
        </div>
        <div className="ml-auto font-medium">Due on 05.02.2024</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>C.O.</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Heritage Bldg</p>
          <p className="text-sm text-muted-foreground">To submit the Heritage Bldg in Division</p>
        </div>
        <div className="ml-auto font-medium">Due on 31.01.2024</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>C.O.</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Funds</p>
          <p className="text-sm text-muted-foreground">
            To submit funds utilization as on 15.02.2024
          </p>
        </div>
        <div className="ml-auto font-medium">Due on 12.02.2024</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>C.O.</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">C.O.</p>
          <p className="text-sm text-muted-foreground">Matheran Proposal</p>
        </div>
        <div className="ml-auto font-medium">Due on 12.02.2024</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>C.O.</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Funds</p>
          <p className="text-sm text-muted-foreground">Fund Allotment additional</p>
        </div>
        <div className="ml-auto font-medium">Due on 12.02.2024</div>
      </div>
    </div>
  )
}