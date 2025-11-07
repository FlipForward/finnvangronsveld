const AudioWave = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-[40vh] pointer-events-none z-0 overflow-hidden">
      {/* Main wave */}
      <div 
        className="absolute inset-0 opacity-20 blur-[100px]"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 0%, hsl(180 100% 50% / 0.6) 0%, transparent 60%)',
        }}
      />
      {/* Secondary wave */}
      <div 
        className="absolute inset-0 opacity-15 blur-[80px] animate-pulse"
        style={{
          background: 'radial-gradient(ellipse 120% 80% at 50% 0%, hsl(180 100% 50% / 0.4) 0%, transparent 50%)',
          animationDuration: '4s',
        }}
      />
    </div>
  );
};

export default AudioWave;
