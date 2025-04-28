import { Stack } from "expo-router";
// import { LogtoProvider, LogtoConfig } from '@logto/rn';

export default function RootLayout() {
  // const config: LogtoConfig = {
  //   endpoint: 'https://xrdr17.logto.app/oidc',
  //   appId: 'lr9qvcclu8xs9eadvrq7g',
  // };
  return (
    // <LogtoProvider config={config}>
      <Stack>
        <Stack.Screen name="Landing" options={{ headerShown: false }} />
      </Stack>
    //  </LogtoProvider>
  );
}
