import { format } from 'date-fns';
import { Alert } from 'react-native';

export function dateToString(date) {
  if (!date) {
    return '';
  }
  return format(date, 'yyyy年M月d日 HH時mm分');
}

export function translateErrors(code) {
  const error = { title: 'エラー', description: '時間を置いてお試しください' };
  switch (code) {
    // signInWithEmailAndPassword のエラー
    case 'auth/invalid-email':
      error.description = 'メールアドレスが不正です。';
      break;
    case 'auth/user-disabled':
      error.description = 'アカウントが無効です。';
      break;
    case 'auth/user-not-found':
      error.description = 'ユーザーが見つかりませんでした。';
      break;
    case 'auth/wrong-password':
      error.description = 'パスワードが間違っています。';
      break;
    // createUserWithEmailAndPassword のエラー
    case 'auth/email-already-in-use':
      error.description = 'メールアドレスが既に使用されています。';
      break;
    case 'auth/operation-not-allowed':
      error.description = '開発者にお問い合わせください。';
      break;
    case 'auth/weak-password':
      error.description = 'パスワードが簡単過ぎます。';
      break;
    default:
  }
  return error;
}
