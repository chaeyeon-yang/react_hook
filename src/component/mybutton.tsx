// 인터페이스: 실체가 존재하지않음. 클래스를 만들지 않고 주로 인터페이스나 타입
interface MyButtonProps {
    title: string;
    disabled: boolean;
}

function MyButton(props: MyButtonProps) {
    return <button disabled={props.disabled}>{props.title}</button>;
}

export default MyButton;
