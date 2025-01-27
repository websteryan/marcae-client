
interface InfoProps {
    estabelecimentoNome: string;
}

const Info: React.FC<InfoProps> = ({estabelecimentoNome}) =>{
    return (
        <h1>
            {estabelecimentoNome}
        </h1>
    );
}

export default Info;