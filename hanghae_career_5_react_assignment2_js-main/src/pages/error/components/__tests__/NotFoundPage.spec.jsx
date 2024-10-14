import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useNavigate } from 'react-router-dom';
import render from '@/utils/test/render';
import { NotFoundPage } from '@/pages/error/components/NotFoundPage';

// useNavigate를 모킹
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

it('Home으로 이동 버튼 클릭시 홈 경로로 이동하는 navigate가 실행된다', async () => {
  // Arrange: 모킹된 navigate 함수와 NotFoundPage 컴포넌트를 렌더링
  const navigate = useNavigate();
  const { user } = render(<NotFoundPage />);  // 렌더링 (await 필요 없음)

  // Act: "Home으로 이동" 버튼 클릭
  const homeButton = screen.getByRole('button', { name: /Home으로 이동/i });
  await user.click(homeButton);

  // Assert: navigate 함수가 '/' 경로와 { replace: true } 옵션으로 호출되었는지 확인
  expect(navigate).toHaveBeenCalledWith('/', { replace: true });
});
