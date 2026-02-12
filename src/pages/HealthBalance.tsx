import AnimatedSection from "../components/AnimatedSection";
import DebtMeter from "../components/DebtMeter";

const HealthBalance = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-primary tracking-widest mb-4">INTEGRITY MONITORING</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold">SYSTEM STABILITY</h1>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto space-y-8">
          <AnimatedSection delay={0.1}>
            <div className="panel-glass rounded-lg p-8">
              <h3 className="font-mono text-xs text-primary tracking-widest mb-4">BALANCE SHEET INTEGRITY</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Health in INERTIA DEBT represents the structural integrity of the player's financial balance sheet.
                Debt overload drains stability. Clean settlement cycles restore it.
              </p>
              <div className="space-y-4">
                <DebtMeter label="Structural Integrity" value={78.5} />
                <DebtMeter label="Debt Load" value={34.2} />
                <DebtMeter label="Recovery Rate" value={62.0} />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="panel-glass rounded-lg p-6">
                <h4 className="font-mono text-xs text-destructive mb-3">OVERLOAD STATE</h4>
                <p className="text-sm text-muted-foreground">When debt exceeds capacity, stability drops per frame. Visual distortion increases. Controls degrade.</p>
              </div>
              <div className="panel-glass rounded-lg p-6">
                <h4 className="font-mono text-xs text-primary mb-3">RECOVERY STATE</h4>
                <p className="text-sm text-muted-foreground">Successful debt settlements restore stability points. Clean movement chains multiply recovery rate.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default HealthBalance;
