const SimpleCard = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>
        Trading Summary Cards
      </h2>

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {/* Card 1 - Total Trades */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
            minWidth: "200px",
            flex: "1",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#e3f2fd",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "12px",
              }}
            >
              📊
            </div>
            <div>
              <div
                style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}
              >
                Total Trades
              </div>
              <div
                style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}
              >
                4
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "11px",
              fontWeight: "500",
              display: "inline-block",
            }}
          >
            All Positions
          </div>
        </div>

        {/* Card 2 - Winning Trades */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
            minWidth: "200px",
            flex: "1",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#e8f5e8",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "12px",
              }}
            >
              📈
            </div>
            <div>
              <div
                style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}
              >
                Winning Trades
              </div>
              <div
                style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}
              >
                3
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#e8f5e8",
              color: "#4caf50",
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "11px",
              fontWeight: "500",
              display: "inline-block",
            }}
          >
            75% win rate
          </div>
        </div>

        {/* Card 3 - Losing Trades */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
            minWidth: "200px",
            flex: "1",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#ffeaea",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "12px",
              }}
            >
              📉
            </div>
            <div>
              <div
                style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}
              >
                Losing Trades
              </div>
              <div
                style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}
              >
                1
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#ffeaea",
              color: "#f44336",
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "11px",
              fontWeight: "500",
              display: "inline-block",
            }}
          >
            25% loss rate
          </div>
        </div>

        {/* Card 4 - Total Return */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
            minWidth: "200px",
            flex: "1",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#e8f5e8",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "12px",
              }}
            >
              💰
            </div>
            <div>
              <div
                style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}
              >
                Total Return
              </div>
              <div
                style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}
              >
                $6,291.16
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#e8f5e8",
              color: "#4caf50",
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "11px",
              fontWeight: "500",
              display: "inline-block",
            }}
          >
            Profit
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCard;
