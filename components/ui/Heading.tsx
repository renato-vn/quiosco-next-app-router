type HeadingProps = {
  children: React.ReactNode;
};

const Heading = ({ children }: HeadingProps) => {
  return <h1 className="text-2xl my-10">{children}</h1>;
};

export default Heading;
