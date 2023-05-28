import { Conversation, Message, User } from '@prisma/client'

export type FullMessageType = Message & {
   sender: User
   seen: Array<User>
}

export type FullConversationType = Conversation & {
   users: Array<User>
   messages: Array<FullMessageType>
}
