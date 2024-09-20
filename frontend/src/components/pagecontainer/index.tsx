import styled from "styled-components";

interface InnerPageContainerProps {
  maxWidth?: string;
}

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return <PageWrapper>{children}</PageWrapper>;
}

export const InnerPageContainer = styled.div<InnerPageContainerProps>`
  flex: 1;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || "auto"};
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

