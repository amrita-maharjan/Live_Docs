"use client";

import { ReactNode, useMemo } from "react";
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from "@/components/loader";
import { getClerksUser, getDocumentsUser } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";

const Provider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser, isLoaded } = useUser();

  const resolveUsers = useMemo(
    () =>
      async ({ userIds }: { userIds: string[] }) => {
        return await getClerksUser({ userIds });
      },
    []
  );

  const resolveMentionSuggestions = useMemo(
    () =>
      async ({ text, roomId }: { text: string; roomId: string }) => {
        return await getDocumentsUser({
          roomId,
          currentUser: clerkUser!.emailAddresses[0].emailAddress,
          text,
        });
      },
    [clerkUser]
  );

  // ⛔ Do not render Liveblocks until Clerk is ready
  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={resolveUsers}
      resolveMentionSuggestions={resolveMentionSuggestions}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
