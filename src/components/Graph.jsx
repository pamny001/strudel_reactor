import { useEffect, useState } from "react";
import * as d3 from "d3";

function Graph() {
    // Latest gain value
    const [gainValue, setGainValue] = useState(0);
    // History of recent gain values (for the bars)
    const [gainArray, setGainArray] = useState([]);
    // Event counter for debugging
    const [eventCount, setEventCount] = useState(0);

    const maxItems = 20; //Max bars
    const maxValue = 0.55;
    const minValue = 0.48;

    // Listen for d3Data events from Strudel
    useEffect(() => {
        const handleD3Event = (event) => {
            const detail = event.detail;

            let totalGain = 0;
            let gainCount = 0;

            if (Array.isArray(detail)) {
                detail.forEach((line) => {
                    const tokens = line.split(" ");
                    tokens.forEach((token) => {
                        const [key, value] = token.split(":");
                        if (key === "gain" && value !== undefined) {
                            const num = Number(value);
                            if (!isNaN(num)) {
                                totalGain += num;
                                gainCount += 1;
                            }
                        }
                    });
                });
            }

            const avgGain = gainCount > 0 ? totalGain / gainCount : 0;

            console.log("avgGain from d3Data:", avgGain, "count:", gainCount);
            setGainValue(avgGain);
            setEventCount((prev) => prev + 1);
        };

        document.addEventListener("d3Data", handleD3Event);

        return () => {
            document.removeEventListener("d3Data", handleD3Event);
        };
    }, []);

    // Push latest gain into history array
    useEffect(() => {
        setGainArray((prev) => {
            const next = [...prev, gainValue];
            if (next.length > maxItems) next.shift();
            return next;
        });
    }, [gainValue]);

    // Draw / update the bars with D3 whenever history changes
    useEffect(() => {
        const svg = d3.select("#gain-graph-svg");
        if (svg.empty()) return;

        // Clear previous frame
        svg.selectAll("*").remove();

        const node = svg.node();
        if (!node) return;

        const rect = node.getBoundingClientRect();
        const h = rect.height;
        const w = rect.width;

        const barMargin = 4;
        const barWidth =
            gainArray.length > 0 ? w / gainArray.length : w;

        // Y scale (0 at bottom, maxValue at top)
        const yScale = d3
            .scaleLinear()
            .domain([minValue, maxValue])
            .range([h, 0]);

        const barGroups = svg.selectAll("g").data(gainArray);

        const newBarGroups = barGroups
            .enter()
            .append("g")
            .attr("transform", (d, i) => {
                return `translate(${i * barWidth}, ${yScale(d)})`;
            });

        newBarGroups
            .append("rect")
            .attr("x", 0)
            .attr("width", barWidth - barMargin)
            .attr("height", (d) => h - yScale(d))
            .attr("fill", "black");
    }, [gainArray]);

    return (
        <div className="App container">
            <h1>
                Gain Output: {gainValue.toFixed(3)}
            </h1>
            <div className="row">
                <svg
                    id="gain-graph-svg"
                    width="100%"
                    height="200px"
                    className="border border-primary rounded p-2"
                ></svg>
            </div>
        </div>
    );
}

export default Graph;
