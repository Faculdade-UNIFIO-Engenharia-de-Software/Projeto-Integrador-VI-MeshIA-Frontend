import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Marker, MarkerContent } from "@/components/ui/marker";
import { Message, MessageAvatar, MessageContent, MessageFooter } from "@/components/ui/message";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble"

export default function ChatLayout({
  children,
}: {
  children:React.ReactNode
}) {
  return (
    <section>
      {children}
      <div id="chat" className="mt-4 border flex min-h-screen rounded-xl overflow-hidden">
        <div id="chat-list" className="border-r w-120">
          <ScrollArea>
            
          </ScrollArea>
        </div>
        <div id="message" className="w-full">
          <div className="flex w-full flex-col gap-6 py-12 px-24">
                <Message align="end">
                  <MessageAvatar>
                    <Avatar>
                      <AvatarImage src="/lucas-avatar.png" alt="@me" />
                      <AvatarFallback>L</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent>
                    <Bubble>
                      <BubbleContent>Deploying to prod real quick.</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
                <Message>
                  <MessageAvatar>
                    <Avatar>
                      <AvatarImage src="/avatars/02.png" alt="@rabbit" />
                      <AvatarFallback>R</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent>
                    <Bubble variant="muted">
                      <BubbleContent>It&apos;s 4:55 PM. On a Friday.</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
                <Message align="end">
                  <MessageAvatar>
                    <Avatar>
                      <AvatarImage src="/lucas-avatar.png" alt="@me" />
                      <AvatarFallback>L</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent>
                    <Bubble>
                      <BubbleContent>It&apos;s a one-line change.</BubbleContent>
                    </Bubble>
                    <MessageFooter>Delivered</MessageFooter>
                  </MessageContent>
                </Message>
                <Message>
                  <MessageAvatar>
                    <Avatar>
                      <AvatarImage src="/avatars/02.png" alt="@rabbit" />
                      <AvatarFallback>R</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent>
                    <BubbleGroup>
                      <Bubble variant="muted">
                        <BubbleContent>
                          It&apos;s always a one-line change 😭.
                        </BubbleContent>
                      </Bubble>
                      <Bubble variant="muted">
                        <BubbleContent>Alright, let me take a look.</BubbleContent>
                        <BubbleReactions aria-label="Reactions: thumbs up">
                          <span>👍</span>
                        </BubbleReactions>
                      </Bubble>
                    </BubbleGroup>
                  </MessageContent>
                </Message>
                <Marker role="status">
                  <MarkerContent className="shimmer">
                    <span className="font-medium">Oliver</span> is typing...
                  </MarkerContent>
                </Marker>
              </div>
        </div>
      </div>
    </section>
  )
}
