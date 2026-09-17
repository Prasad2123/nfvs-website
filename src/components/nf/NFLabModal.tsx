import React from 'react';
import { X, Cpu, Wifi, Bot, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

interface NFLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDomain: 'AI' | 'IoT' | 'Robotics' | 'Electronics';
  onSelectDomain: (domain: 'AI' | 'IoT' | 'Robotics' | 'Electronics') => void;
  onApply: (domain: string) => void;
  isDark?: boolean;
}

export const NFLabModal: React.FC<NFLabModalProps> = ({
  isOpen,
  onClose,
  activeDomain,
  onSelectDomain,
  onApply,
  isDark = true,
}) => {
  if (!isOpen) return null;

  const labDetails = {
    AI: {
      title: 'AI & Machine Learning Lab',
      badge: 'AI & Data Science',
      icon: Cpu,
      color: 'from-blue-600 to-indigo-700',
      description:
        'GPU clusters, model training workstations, and cloud sandboxes for deep-tech AI algorithms, computer vision, NLP, and predictive analytics.',
      equipment: [
        'NVIDIA RTX & A100 GPU compute instances',
        'Pre-configured PyTorch, TensorFlow & TensorRT stacks',
        'Edge AI accelerators (Jetson Orin & Coral TPUs)',
        'Dataset labeling & synthetic data generation pipelines',
        'Model inference optimization & deployment testbeds',
      ],
      deliverables: 'Production-ready AI models, inference pipelines & enterprise APIs.',
    },
    IoT: {
      title: 'IoT & Connected Systems Lab',
      badge: 'IoT & Smart Sensors',
      icon: Wifi,
      color: 'from-cyan-600 to-blue-700',
      description:
        'Testing rigs for wireless protocols, smart sensor arrays, firmware tools, and gateways for industrial and healthcare IoT products.',
      equipment: [
        'Multi-protocol test benches: LoRaWAN, BLE 5.3, Zigbee, WiFi 6',
        'High-precision digital oscilloscopes & logic analyzers',
        'Ultra-low power testing & energy harvesting simulators',
        'Industrial sensor interfacing rigs (thermal, optical, pressure)',
        'Secure cloud MQTT broker & OTA firmware testbeds',
      ],
      deliverables: 'Field-tested hardware nodes ready for pilots and mass PCB fabrication.',
    },
    Robotics: {
      title: 'Robotics & Automation Lab',
      badge: 'Robotics & Automation',
      icon: Bot,
      color: 'from-amber-600 to-orange-700',
      description:
        'Rapid physical prototyping suite with multi-axis CNC machines, 3D printing farm, robotic arm test cells, and ROS2 simulation environments.',
      equipment: [
        '6-DOF industrial robotic arms & collaborative robot (Cobot) cells',
        'High-precision SLA & FDM 3D printing farm',
        'Motor drive test benches (BLDC, Stepper, Servo with feedback)',
        'LiDAR, ultrasonic & stereo-depth vision rigs',
        'ROS2 simulation & kinematics modeling environments',
      ],
      deliverables: 'Functional electromechanical MVPs tested for industrial reliability.',
    },
    Electronics: {
      title: 'Electronics & Embedded Systems Lab',
      badge: 'Electronics & PCB Design',
      icon: Zap,
      color: 'from-emerald-600 to-teal-700',
      description:
        'Electronics development station for schematic design, multi-layer PCB prototyping, SMD soldering, and compliance testing.',
      equipment: [
        'SMD rework stations, reflow ovens & thermal imaging',
        'Automated optical inspection (AOI) & digital microscopes',
        'Multi-layer PCB prototyping milling machines',
        'Spectrum analyzers & signal generators up to 6 GHz',
        'Standard compliance & thermal reliability test chambers',
      ],
      deliverables: 'Production-ready Gerber files, BOM optimization & compliance readiness.',
    },
  };

  const current = labDetails[activeDomain];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col transition-colors duration-300 ${
        isDark
          ? 'bg-[#091528] border border-sky-500/40 text-white'
          : 'bg-white border border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`bg-gradient-to-r ${current.color} p-4 sm:p-6 pr-14 sm:pr-16 relative transition-colors duration-300 text-white`}>
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 p-1.5 sm:p-2 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/20 text-white text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Icon className="w-3.5 h-3.5" />
            SPECIALIZED LAB INFRASTRUCTURE
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-balance">{current.title}</h2>
          <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-xl text-pretty">
            NF Venture Studio provides lab access to turn prototypes into industrial-grade ventures.
          </p>
        </div>

        {/* Domain Tabs - Horizontal Scroll on mobile */}
        <div className={`p-2 flex border-b gap-1.5 overflow-x-auto no-scrollbar transition-colors ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {(['AI', 'IoT', 'Robotics', 'Electronics'] as const).map((dom) => (
            <button
              key={dom}
              onClick={() => onSelectDomain(dom)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeDomain === dom
                  ? 'bg-sky-500 text-white shadow-md'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                dom === 'AI' ? 'bg-blue-400' :
                dom === 'IoT' ? 'bg-cyan-400' :
                dom === 'Robotics' ? 'bg-amber-400' : 'bg-emerald-400'
              }`} />
              {dom} Lab
            </button>
          ))}
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 sm:space-y-5">
          <div>
            <h4 className={`text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-1 ${
              isDark ? 'text-sky-400' : 'text-sky-700'
            }`}>
              Lab Overview
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {current.description}
            </p>
          </div>

          <div>
            <h4 className={`text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-2 ${
              isDark ? 'text-sky-400' : 'text-sky-700'
            }`}>
              Key Facilities & Equipment Available
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {current.equipment.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl border text-xs transition-colors ${
                    isDark
                      ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
              <span className="safe-wrap">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-3 sm:p-3.5 rounded-xl border text-xs ${
            isDark
              ? 'bg-sky-950/60 border-sky-500/30 text-sky-200'
              : 'bg-sky-50 border-sky-200 text-sky-900'
          }`}>
            <span className={`font-bold ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>Target Output: </span>
            {current.deliverables}
          </div>
        </div>

        {/* Footer */}
        <div className={`p-3.5 sm:p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2.5 transition-colors ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Helpline: <span className={`font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>8379879846</span>
          </div>
          <button
            onClick={() => {
              onClose();
              onApply(activeDomain);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-black uppercase tracking-wide text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 rounded-xl transition-all shadow-md cursor-pointer text-center"
          >
            Apply for {activeDomain} Lab Access
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
