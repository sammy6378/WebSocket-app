

interface InputProps {
  placeholder: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

function Input({ placeholder,handleInput,name }: InputProps) {
  return (
    <div>
 
      <input name={name} onChange={handleInput} className="input-field" placeholder={placeholder} />
        
    
    </div>
  )
}

export default Input