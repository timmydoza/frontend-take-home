import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@radix-ui/themes/styles.css';
import { Box, Container, Section, Tabs, Theme } from '@radix-ui/themes';

import { UserTab } from './components/UserTab';
import { RolesTab } from './components/RolesTab';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <Section>
          <Container>
            <Tabs.Root defaultValue="users">
              <Tabs.List>
                <Tabs.Trigger value="users">Users</Tabs.Trigger>
                <Tabs.Trigger value="roles">Roles</Tabs.Trigger>
              </Tabs.List>

              <Box pt="3">
                <Tabs.Content value="users">
                  <UserTab />
                </Tabs.Content>

                <Tabs.Content value="roles">
                  <RolesTab />
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Container>
        </Section>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
