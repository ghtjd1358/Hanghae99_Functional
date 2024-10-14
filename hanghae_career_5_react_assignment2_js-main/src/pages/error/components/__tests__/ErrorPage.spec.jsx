import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useNavigate } from 'react-router-dom';
import render from '@/utils/test/render';
import { ErrorPage } from '../ErrorPage';

// useNavigate를 모킹
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

it('"뒤로 이동" 버튼 클릭시 navigate(-1) 함수가 호출된다', async () => {
  // Arrange: 모킹된 navigate 함수와 ErrorPage 컴포넌트를 렌더링
  const navigate = useNavigate();
  const { user } = await render(<ErrorPage />);

  // Act: "뒤로 이동" 버튼 클릭
  const backButton = screen.getByRole('button', { name: /뒤로 이동/i });
  await user.click(backButton);

  // Assert: navigate 함수가 -1 인자로 호출되었는지 확인
  expect(navigate).toHaveBeenCalledWith(-1);
});
