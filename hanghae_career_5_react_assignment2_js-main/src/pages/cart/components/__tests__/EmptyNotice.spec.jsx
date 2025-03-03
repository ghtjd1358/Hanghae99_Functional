import { screen } from '@testing-library/react';
import customRender from '@/utils/test/render';
import { navigateFn } from '@/utils/test/setupTests';
import { EmptyNotice } from '../EmptyNotice';

it('"홈으로 가기" 링크를 클릭할 경우 "/" 경로로 navigate 함수가 호출된다', async () => {
  // Arrange: EmptyNotice 컴포넌트를 렌더링
  const { user } = await customRender(<EmptyNotice />);

  // Act: "홈으로 가기" 링크 텍스트를 가진 요소를 클릭
  const homeLink = screen.getByText(/홈으로 가기/i);
  await user.click(homeLink);

  // Assert: navigate 함수가 '/' 경로로 호출되었는지 확인
  expect(navigateFn).toHaveBeenCalledWith('/');
});
