import { getFriendsByUserId } from "@/components/helpers/get-friends";
import { fetchRedis } from "@/components/helpers/redis";
import { authOptions } from "@/lib/auth";
import { chatHrefConstructor } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const friends = await getFriendsByUserId(session.user.id);

  const friendsWithLastMessage = await Promise.all(
    friends.map(async (friend) => {
      const [lastMessageRaw] = (await fetchRedis(
        "zrange",
        `chat:${chatHrefConstructor(session.user.id, friend.id)}:messages`,
        -1,
        -1
      )) as string[];

      let lastMessage: Message | null = null;
      if (lastMessageRaw) {
        lastMessage = JSON.parse(lastMessageRaw) as Message;
      }

      return {
        ...friend,
        lastMessage,
      };
    })
  );

  return {
    session,
    friendsWithLastMessage,
  };
};

export default DashboardPage;
