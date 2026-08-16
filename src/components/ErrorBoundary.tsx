import React, { ReactNode, ErrorInfo } from 'react';
import { ShieldAlert, RefreshCw, MessageCircle } from 'lucide-react';
import { telemetry } from '../lib/observability';
import { OFFICE_CONTACT } from '../data/legalData';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public props: Props;
  public state: State = {
    hasError: false,
  };

  constructor(props: Props) {
    super(props);
    this.props = props;
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    telemetry.captureException(error, {
      componentStack: errorInfo.componentStack,
    });
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#120D0B] text-[#F3EFEA] flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 tobacco-bg gold-border shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 border-[1.5px] border-[#D4AF37] flex items-center justify-center transform rotate-45 mx-auto bg-[#120D0B]">
              <ShieldAlert className="w-7 h-7 text-[#D4AF37] transform -rotate-45" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold block">
                Drigo & Carneiro Advocacia
              </span>
              <h2 className="text-xl font-cinzel font-bold text-[#FFFFFF]">
                Ocorreu uma instabilidade pontual
              </h2>
              <p className="text-xs text-[#F3EFEA]/70 leading-relaxed">
                Nosso sistema registrou automaticamente este evento na central de observabilidade.
                Você pode recarregar a página ou falar diretamente com nosso atendimento.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider bg-[#D4AF37] hover:bg-[#E5C378] text-[#120D0B] transition-all cursor-pointer shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Recarregar</span>
              </button>

              <a
                href={`https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent('Olá, preciso de atendimento jurídico com os advogados Drigo & Carneiro.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#F3EFEA] hover:text-[#D4AF37] border border-[#D4AF37]/50 hover:border-[#D4AF37] bg-[#120D0B] transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
